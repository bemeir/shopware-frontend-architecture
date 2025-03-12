import template from './sw-cms-preview-blueally-banner.html.twig';
import './sw-cms-preview-blueally-banner.scss';

Shopware.Component.register('sw-cms-preview-blueally-banner', {
    template,
    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
