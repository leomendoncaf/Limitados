/// <reference types="cypress"/>

describe("Criando cenário de teste para site limitados", () => {
   it("Caso de teste: Registrando um usuário no site com sucesso", () => {
      let info = criarUsuario();
   });
   it("Caso de teste: Criando Grupo com sucesso", () => {
      let info = criarUsuario();
      cy.get("#home-body > :nth-child(1)").click();
      cy.get(".mdi-plus").click();
      cy.get("#input-31").type("Grupo teste");
      cy.get("#input-33").type("Descrição do grupo de teste");

      cy.get(".v-btn--elevated").click();
      cy.get(".v-card-title").should("contain.text", "Grupo teste");
   });
   it("Caso de teste: Deletando Grupo com sucesso", () => {
      let info = criarUsuario();
      cy.get("#home-body > :nth-child(1)").click();
      cy.get(".mdi-plus").click();
      cy.get("#input-31").type("Grupo teste a ser deletado");
      cy.get("#input-33").type("Descrição do Grupo teste a ser deletado");

      cy.get(".v-btn--elevated").click();
      cy.get(".v-card-title").should(
         "contain.text",
         "Grupo teste a ser deletado"
      );
      cy.wait(1000);
      cy.get(".v-card-actions > .text-primary > .v-btn__content").click();
      cy.get("p").should(
         "contain.text",
         "Você não participa de nenhum grupo no momento. Crie um grupo acima."
      );
   });
   it("Caso de teste: Testando dark/light mode", () => {
      let info = criarUsuario();
      cy.get("#home-body > :nth-child(2)").click();
      cy.wait(1000);
      cy.get(".mdi-brightness-3").click();
      cy.get(".mdi-brightness-4").should("be.visible");
   });
});

function criarUsuario() {
   let horas = new Date().getHours().toString();
   let min = new Date().getMinutes().toString();
   let seg = new Date().getSeconds().toString();
   let username = "login" + horas + min + seg;
   let password = "pass" + horas + min + seg;

   let userinfo = [username, password];

   cy.visit("http://localhost:3000/signup");
   cy.get("#input-0").type(username);
   cy.get("#input-2").type(username + "@gmail.com");
   cy.get("#input-4").type("password");
   cy.get("#input-6").type("password");
   cy.get(".v-form > .v-btn > .v-btn__content").click();

   cy.get("#home-body > :nth-child(1)").should("be.visible");
   return userinfo;
}
