// src/Resources/app/administration/src/module/sw-cms/elements/multi-item-banner/component/index.js
import template from './sw-cms-el-multi-item-banner.html.twig';

const { Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-multi-item-banner', {
    template,
    mixins: [Mixin.getByName('cms-element')],

    inject: ['repositoryFactory'],

    computed: {
        items() {
            return this.element.config.items.value;
        },
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('multi-item-banner');
            this.hydrateElementData();
        },

        async hydrateElementData() {
            // If we already have element.data, let's clear or reuse it
            if (!this.element.data) {
                this.element.data = {};
            }

            // For each item, if we have an image ID, fetch the media & store in element.data
            for (let index = 0; index < this.items.length; index++) {
                const imageId = this.items[index].image;
                if (!imageId) {
                    // If no image, ensure data is null or empty
                    this.element.data[`media-${index}`] = null;
                    this.element.data[`mediaId-${index}`] = null;
                    continue;
                }

                const mediaEntity = await this.mediaRepository.get(imageId);
                this.element.data[`media-${index}`] = mediaEntity;
                this.element.data[`mediaId-${index}`] = imageId;
            }
        },

        getMediaUrl(index) {
            const mediaKey = `media-${index}`;
            const storedMedia = this.element.data?.[mediaKey];
            return storedMedia?.url || null;
        },
    },
});
