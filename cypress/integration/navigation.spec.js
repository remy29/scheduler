describe("Navigation", () => {
  //Basic test to check if page loads and renders
  it("should visit root", () => {
    cy.visit("/");
  });
  // Checks that a day can be selected
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
