import { RenderSignIn } from "../../../components/Views/SignIn"
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native"


describe("SignIn", () => {
    describe("RenderSignIn", () => {
        it("correctly calls onSubmit with data given", async () => {
            const mockFn = jest.fn()

            render(<RenderSignIn onSubmit={mockFn} />)

            await waitFor(() => {
                fireEvent.changeText(screen.getByPlaceholderText("Username"), "Test-dude");
                fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
                fireEvent.press(screen.getByTestId("SubmitBtn"));
            })
            
            expect(mockFn.mock.calls[0][0]).toStrictEqual({
                username: "Test-dude", 
                password: "password"
        })

        })
    })
})