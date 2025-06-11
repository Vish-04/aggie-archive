import { render, screen, fireEvent } from '@testing-library/react'
import ClassCard from '../ClassCard'

// create fake course
const fakeCourse = {
    id: 'ecs162',
    course_code: 'ECS 162',
    title: 'Web Programming',
}

// placeholder functions
const toggleClass = jest.fn()
const toggleArchive = jest.fn()

describe('ClassCard', () => {
    test('renders class card attributes', () => {
        render(
            <ClassCard
                course={fakeCourse}
                onToggleClass={toggleClass}
                onToggleArchive={toggleArchive}
                isArchived={() => false}
            />
        )

        // get course code, title, and the default image
        expect(screen.getByText(/ECS 162/i)).toBeInTheDocument()
        expect(screen.getByText(/Web Programming/i)).toBeInTheDocument()
        expect(screen.getByAltText(/Default class card image/i)).toBeInTheDocument()
    })
})


