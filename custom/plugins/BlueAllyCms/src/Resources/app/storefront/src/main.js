// Import all necessary Storefront plugins
import ExamplePlugin from './example-plugin/example-plugin.plugin';
import './scss/base.scss';

// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;

PluginManager.register('ExamplePlugin', ExamplePlugin, '[data-example-plugin]');
