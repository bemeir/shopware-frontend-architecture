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
                    title: 'Item 1',
                    content: 'Hello',
                    image: null,
                    background: '#ffffff',
                },
                {
                    title: 'Item 2',
                    content: 'World',
                    image: null,
                    background: '#f5f5f5',
                },
            ],
        },
    },
});
