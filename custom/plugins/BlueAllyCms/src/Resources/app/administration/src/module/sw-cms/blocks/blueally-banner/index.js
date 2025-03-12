import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'blueally-banner',
    category: 'text-image',
    label: 'My Image Text Block!',
    component: 'sw-cms-block-blueally-banner',
    previewComponent: 'sw-cms-preview-blueally-banner',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        content: 'multi-item-banner',
    },
});
