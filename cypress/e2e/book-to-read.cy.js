describe("Visit login page and authenticate", () => {
  it("logs in via UI, verifies redirection, and fetches books", () => {
    cy.visit("http://localhost:5173/users/sign_in");

    // Fill in login form
    cy.get('[type="text"]').type("admin@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('[type="submit"]').click();

    // Ensure successful login and redirection
    cy.url().should("eq", "http://localhost:5173/");

    cy.get('[type="text"]').type("Riwayat Hidup Muhammad by Martin Lings");
    cy.get('[type="submit"]').click();

    cy.get('.btn-primary').eq(0).click();
    cy.get('.btn-warning').eq(0).click();
    cy.get('.btn-danger').eq(0).click();

    cy.get('[type="text"]').type("Killing Commendetore by Haruki Murakami");
    cy.get('[type="submit"]').click();

    cy.get('.logout').click();
    cy.url().should("eq", "http://localhost:5173/users/sign_in");
  });
});
