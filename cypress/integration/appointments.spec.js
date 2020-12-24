// Cypress Testing Suite 

describe("Appointments", () => {
  //Resets databse, goes to root, and checks for monday before each test
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Clicks Add button 
    cy.get("[alt=Add]").first().click();
    // Types name in input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Selects interviewer
    cy.get('[alt="Sylvia Palmer"]').click();
    //Clicks Save Button
    cy.contains("Save").click();
    //Checks correct appoint is displayed
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  // Follows mostly the same pattern as "should book interview"
  it("should edit an interview", () => {
    
    cy.get("[alt=Edit]").first().click({ force: true }); // option object with paramater force true must be on to click concealed button

    cy.get("[data-testid=student-name-input]")
      .clear() // Deletes text 
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click(); 

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist"); // Checks that async loader is shown
    cy.contains("Deleting").should("not.exist"); // Checks that loader leaves

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist"); // confirms delete was succesfull
  });
});
