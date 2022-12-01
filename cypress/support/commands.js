import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { Router } from '../../src/router/mainRouter.js';
import { createStore } from "vuex";
import { storeProt } from "../../src/store/mainStore.js";

Cypress.Commands.add('mount', (component, options = {}) => {
    // Setup options object
    options.global = options.global || {}
    options.global.plugins = options.global.plugins || []

    // create router if one is not provided
    if (!options.router) {
        options.router = createRouter({
            routes: Router,
            history: createMemoryHistory(),
        })
    }

    const store = createStore(storeProt)

    // Add router plugin
    options.global.plugins.push({
        install(app) {
            app.use(options.router)
            app.use(store)
        },
    })

    return mount(component, options)
})