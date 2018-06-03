# 2359 Take Home Assignment

## Instructions

1. `npm install`
2. `npm start`

## Requirements

### Basic

- The user should be able to search by keyword for images
- Images should be shown in a grid with consistent width and height images, without stretching the images (cropping is ok, so long as the image fills the grid space), with a default maximum of 8 images shown per search
- The user should be able to add and remove a tag from images to mark or unmark them as a favourite image
- Different app states should ideally be accounted for with UI feedback to the user, e.g. errors, loading, etc

### Additional

- Add a "Fetch More" button displayed below the results that will fetch the next 8 image results for the current search
- A dedicated page that the user can go to view their tagged favourite images at any time

## Development Guidelines

- Built using React JS
- Asynchronous code/events should ideally use Promises
- Ideally easy to add more API calls for additional image services in the future
- Support Internet Explorer 11 and upwards
- Some steps taken towards providing a responsive layout

## Issues Faced

- :heavy_check_mark: Favourite overlay unable to adhere to parent width (React bootstrap Thumbnail module)
- :heavy_check_mark: Unable to show hover overlay and click the element underneath at the same time
- :heavy_check_mark: Unable to submit form in IE11
- :x: Fetch More button should not work if previous data has not loaded
- :x: Image cropping not working in IE11

## Future Improvements

- UI element to allow users to choose API service
- Toggle between GIFs and static images