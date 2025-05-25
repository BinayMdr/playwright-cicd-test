Feature: SauceDemo Shopping

  Scenario: Verify ascending price order
    Given I am logged in to SauceDemo
    When I sort products by price ascending
    Then products should be sorted in ascending order

  Scenario: Verify descending price order
    Given I am logged in to SauceDemo
    When I sort products by price descending
    Then products should be sorted in descending order

  Scenario: Place an order
    Given I am logged in to SauceDemo
    When I place an order for "Sauce Labs Backpack" and "Sauce Labs Bolt T-Shirt"
    Then I should see the order confirmation message
