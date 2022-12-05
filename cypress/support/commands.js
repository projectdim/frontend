import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { Router } from '../../src/router/mainRouter.js';
import { createStore } from "vuex";
import { storeProt } from "../../src/store/mainStore.js";

// Cypress.Commands.add('mount', (component, options = {}) => {
//     // Setup options object
//     options.global = options.global || {}
//     options.global.plugins = options.global.plugins || []
//
//     // create router if one is not provided
//     if (!options.router) {
//         options.router = createRouter({
//             routes: Router,
//             history: createMemoryHistory(),
//         })
//     }
//
//     const store = createStore(storeProt)
//
//     // Add router plugin
//     options.global.plugins.push({
//         install(app) {
//             app.use(options.router)
//             app.use(store)
//         },
//     })
//
//     return mount(component, options)
// });


Cypress.Commands.add('login', (user) => {
    cy.get('#loginButton').click();
    cy.get('#loginModal').within(() => {
        cy.get('[name=email]').clear().type(user.email);
        cy.get('[name=password]').clear().type(user.password);
    });
    cy.get('#loginModal').find('#loginButton').click();
    cy.get('#loginModal').should('not.exist');
    cy.get('#loginButton').should('not.exist');
    cy.get('#logoutButton').should('exist');
});

Cypress.Commands.add('logout', () => {
    cy.get('#logoutButton').click();
    cy.get('#logoutButton').should('not.exist');
    cy.get('#loginButton').should('exist');
});

