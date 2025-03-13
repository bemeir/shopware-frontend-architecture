import template from './sw-cms-el-config-multi-item-banner.html.twig';
import './sw-cms-el-config-multi-item-banner.scss';

const { Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-config-multi-item-banner', {
    template,

    inject: ['repositoryFactory'],

    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            mediaModalIsOpen: false,
            currentEditIndex: null, // which item is being edited?
            positionOptions: [
                { label: 'Top Left', value: 'top-left' },
                { label: 'Top Center', value: 'top-center' },
                { label: 'Top Right', value: 'top-right' },
                { label: 'Middle Left', value: 'middle-left' },
                { label: 'Middle Center', value: 'middle-center' },
                { label: 'Middle Right', value: 'middle-right' },
                { label: 'Bottom Left', value: 'bottom-left' },
                { label: 'Bottom Center', value: 'bottom-center' },
                { label: 'Bottom Right', value: 'bottom-right' },
            ],
        };
    },

    computed: {
        items() {
            return this.element.config.items.value;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        cmsPageState() {
            // Typically from 'sw-cms-state', fallback if not
            return {
                pageEntityName: 'cms_page',
            };
        },
    },

    created() {
        this.initElementConfig('multi-item-banner');
    },

    methods: {
        /*-------------------------------------------------*/
        /* MULTI-ITEM LOGIC                                */
        /*-------------------------------------------------*/
        addItem() {
            this.items.push({
                title: '',
                content: '',
                image: null,
                textColor: '#ffffff',
            });
            this.$emit('element-update', this.element);
        },

        removeItem(index) {
            this.items.splice(index, 1);
            // optionally remove from element.data
            this.$emit('element-update', this.element);
        },

        // GETTERS
        getTitle(index) {
            return this.items[index].title;
        },
        getContent(index) {
            return this.items[index].content;
        },
        getTextColor(index) {
            return this.items[index].textColor;
        },
        getImage(index) {
            return this.items[index].image; // ID
        },

        getTitleHeading(index) {
            return this.items[index].titleHeading;
        },

        getPosition(index) {
            return this.items[index].position;
        },

        // SETTERS
        setTitle(index, val) {
            this.items[index].title = val;
            this.$emit('element-update', this.element);
        },
        setContent(index, val) {
            this.items[index].content = val;
            this.$emit('element-update', this.element);
        },
        setTextColor(index, val) {
            this.items[index].textColor = val;
            this.$emit('element-update', this.element);
        },

        setTitleHeading(index, val) {
            this.items[index].titleHeading = val;
            this.$emit('element-update', this.element);
        },

        setPosition(index, val) {
            console.log('running');
            this.items[index].position = val;
            this.$emit('element-update', this.element);
        },

        /*-------------------------------------------------*/
        /*   UNIQUE UPLOAD TAG PER ITEM                    */
        /*-------------------------------------------------*/
        getUploadTag(index) {
            // example: "cms-element-media-config-<elementId>-<index>"
            return `cms-element-media-config-${this.element.id}-${index}`;
        },

        /*-------------------------------------------------*/
        /*   MEDIA UPLOAD (via drag & drop)                */
        /*-------------------------------------------------*/
        async onImageUpload({ targetId }, index) {
            console.log(
                'onImageUpload: index =',
                index,
                ', targetId =',
                targetId,
            );
            if (!targetId) {
                this.items[index].image = null;
                this.updateElementData(null, index);
                this.$emit('element-update', this.element);
                return;
            }

            const mediaEntity = await this.mediaRepository.get(targetId);
            if (!mediaEntity) {
                this.items[index].image = null;
                this.updateElementData(null, index);
                this.$emit('element-update', this.element);
                return;
            }

            this.items[index].image = mediaEntity.id;
            this.updateElementData(mediaEntity, index);

            this.$emit('element-update', this.element);
        },

        onImageRemove(index) {
            // user clicked remove
            this.items[index].image = null;
            this.updateElementData(null, index);
            this.$emit('element-update', this.element);
        },

        /*-------------------------------------------------*/
        /*   OPENING THE MEDIA MODAL (SHOPWARE LIBRARY)    */
        /*-------------------------------------------------*/
        onOpenMediaModal(index) {
            // we remember which item is being edited
            console.log('onOpenMediaModal was called with index =', index);
            this.currentEditIndex = index;
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        /**
         * Fired when user selects media in <sw-media-modal-v2> (the library).
         * We get an array of selected media, store in items[currentEditIndex].
         */
        async onSelectionChanges(mediaEntities) {
            console.log('Selected from library:', mediaEntities);

            if (!mediaEntities || !mediaEntities.length) {
                // user didn't actually select anything
                this.onCloseModal();
                return;
            }

            // The first selected file
            const media = mediaEntities[0];

            // 1) Store its ID in items[this.currentEditIndex].image
            this.items[this.currentEditIndex].image = media.id;

            // 2) Optionally fetch the full entity for .url, if you want real-time preview
            const fullEntity = await this.mediaRepository.get(media.id);

            console.log('Current edit index:', this.currentEditIndex);

            // 3) Store the full entity in element.data["media-<index>"]
            this.updateElementData(fullEntity, this.currentEditIndex);

            // 4) Mark the element as changed
            this.$emit('element-update', this.element);

            // Close the modal
            this.onCloseModal();
        },

        /*-------------------------------------------------*/
        /*   STORING FULL MEDIA IN element.data            */
        /*-------------------------------------------------*/
        updateElementData(mediaEntity, index) {
            if (!this.element.data) {
                this.element.data = {};
            }
            const mediaKey = `media-${index}`;
            const mediaIdKey = `mediaId-${index}`;

            const mediaId = mediaEntity ? mediaEntity.id : null;

            this.element.data[mediaKey] = mediaEntity; // store the entire entity with .url
            this.element.data[mediaIdKey] = mediaId;
        },

        /*-------------------------------------------------*/
        /*   getPreviewSource for <sw-media-upload-v2>     */
        /*-------------------------------------------------*/
        getPreviewSource(index) {
            const mediaKey = `media-${index}`;
            const storedMedia = this.element.data?.[mediaKey];

            // If we have a fully loaded media entity, show that
            if (storedMedia && storedMedia.id) {
                return storedMedia; // has .url, .fileName, etc.
            }

            // else just show an object with ID if we have it
            const item = this.items[index];
            if (item.image) {
                return { id: item.image, url: '' };
            }
            return null;
        },
    },
});
