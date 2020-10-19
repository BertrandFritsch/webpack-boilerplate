Feature: Main features
  Searching for Github repositories

  Scenario: Show user details
    Given I am on the main page
    Then I should see my profile

  Scenario: Show repository list
    Given I am on the main page
    When I search for the repositories containing the word "react"
    Then I should see the list of repositories

  Scenario: Show repository loading error
    Given I am on the main page
    When An error occurs while searching for the repositories matching a search string
    Then I should see an error message
    But I should not see the list of repositories
