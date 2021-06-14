import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from './../Display';
import fetchShow from './../../api/fetchShow';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
jest.mock('./../../api/fetchShow');

const testShow = {
    //add in appropriate test data structure here.
    name: "",
    summary: "",
    seasons: [
        {
            id: 1,
            name: "season 1",
            episodes: []
        },
        {
            id: 2,
            name: "season 2",
            episodes: []
        },
        {
            id: 3,
            name: "season 3",
            episodes: []
        }
    ]
}

test("renders without errors", () => {
    render(<Display />);
})

test("when fetch button is pressed, the show component displays", async () => {
    render(<Display/>);

    fetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const show = screen.queryByTestId("show-container");
        expect(show).toBeInTheDocument();
    })
})

test("when fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in test data", async () => {
    render(<Display/>);
        
        fetchShow.mockResolvedValueOnce(testShow);

        const button = screen.getByRole("button");
        userEvent.click(button);

        await waitFor(() => {

        const options = screen.queryAllByTestId("season-option")
        
        expect(options).toHaveLength(3);
        
    })
})

test("when fetch button is pressed, displayFunc is called", async () => {
    const mockDisplayFunc = jest.fn();
    
    render(<Display displayFun={mockDisplayFunc}/>);

    fetchShow.mockResolvedValueOnce(testShow, mockDisplayFunc());

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        expect(mockDisplayFunc).toHaveBeenCalledTimes(1);
    })   
})


///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.