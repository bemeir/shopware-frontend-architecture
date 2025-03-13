import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'multi-item-banner',
    label: 'Multi-Item Banner',
    component: 'sw-cms-el-multi-item-banner',
    configComponent: 'sw-cms-el-config-multi-item-banner',
    previewComponent: 'sw-cms-el-preview-multi-item-banner',
    defaultConfig: {
        items: {
            source: 'static',
            // We'll store an array of items; each has title, content, image, background, etc.
            value: [
                {
                    title: 'Lorem ipsum #1',
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed egestas tortor. Proin facilisis faucibus dui a congue. Fusce porta odio vitae lectus feugiat faucibus.',
                    image: null,
                    textColor: '#ffffff',
                    titleHeading: 'h1',
                    position: 'middle-center', // <--- new property
                },
            ],
        },
    },
});
