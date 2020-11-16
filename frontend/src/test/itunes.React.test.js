//import react, the test renderer and the Display component
import React from "react";
import renderer from "react-test-renderer";
import Display from "../Display";

//this test will use a snapshot test to check that the app renders correctly 
test("renders correctly", () => {
  const tree = renderer.create(<Display></Display>).toJSON();
  expect(tree).toMatchSnapshot();
});
