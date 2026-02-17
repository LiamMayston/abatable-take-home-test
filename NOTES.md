# Implementation Notes

## Task 1

Fixed the `averagePricePerTonne` bug. While the code theoretically calculates the average price per ton, it doesn't take into account the actual amount of units so I fixed that by making it calculate the Weighted average which is more useful.

Added a Summary Card component that displays the returned values from calling the portfolio summary endpoint.

## Task 2

Added a query parameter to the backend to allow filtering on the status along with validation.

- I chose the query parameter as it is more flexible and scalable as you can now add more filter types in the future without having to create extra endpoints for each filter as well as combination of filters.
- I reused the current `PositionStatus` to type the filter and just allowed the possibility of it being undefined. Since TypeScript is compile time I can't use the type values themselves but copied them as strings in the validation logic. You could use a const array and create a isPositionStatus function but since it is only used once here it is fine for now.

I added filtering logic to the handler of the endpoint.

- I chose this approach as the `computeSummary` function is a pure calculation function that shouldn't care whether the data is filtered or not. If this function's algorithm changed depending on the status for example then I would have rather handled it inside the function as the logic would then depend on it.

I added tests for all cases of the filter addition.

## Task 3

I added skeleton loaders to the summary so that the user has clear indicators that the UI is loading. This also allows for the table to be displayed instantly to the user while the summary loads creating a better user experience as they can access the rest of the page without having to wait for everything to load. If the table was dependant on the summary then I would have chosen a different approach.

I also used TanStack Query to make the code easier to read and to allow automatic caching to improve the UX as it is an API based state.

The choice for the state to be internal to the component means that it can be reused anywhere that the summary of the positions is needed without needing changes from the parent page.

## Task 4

I added a simple radio button to choose the filter choice. This is a simple UI that is effective.

I also added the filter as a parameter for the TanStack query key/function so that it can cache each filtered version of the data independently.
