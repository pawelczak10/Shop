// __tests__/index.test.jsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import NewsletterformView from './NewletterForm'

describe('Home', () => {
    it('show success message when status is success', () => {
        const status = "idle"
        const onSubmit = jest.fn()
        render(<NewsletterformView onSubmit={onSubmit} status={"success"} />)

        const succesMessage = screen.queryByText("wszytsko okej")
        // const heading = screen.getByRole('heading', {
        //     name: /welcome to next\.js!/i,
        // })

        expect(succesMessage).toBeInTheDocument()
    })
    it('doesnt show success message when status is success', () => {
        const status = "idle"
        const onSubmit = jest.fn()
        render(<NewsletterformView onSubmit={onSubmit} status={"error"} />)

        const succesMessage = screen.queryByText("wszytsko okej")
        // const heading = screen.getByRole('heading', {
        //     name: /welcome to next\.js!/i,
        // })

        expect(succesMessage).not.toBeInTheDocument()
    })
    it('not submit form when button is clicked and input is empty', () => {
        const status = "idle"
        const onSubmit = jest.fn()
        render(<NewsletterformView onSubmit={onSubmit} status={"error"} />)

        const button = screen.getByText('Try it & Subscribe')
        fireEvent.click(button)
        expect(onSubmit).not.toHaveBeenCalled()

    })
    it(' submit form when button is clicked ', async () => {
        const status = "idle"
        const onSubmit = jest.fn()
        render(<NewsletterformView onSubmit={onSubmit} status={"error"} />)
        const input = screen.getByLabelText("Email address")
        fireEvent.input(input, { target: { value: "test@test.com" } })
        const button = screen.getByText('Try it & Subscribe')
        fireEvent.click(button)
        await waitFor(() => expect(onSubmit).toHaveBeenCalled())

    })
})