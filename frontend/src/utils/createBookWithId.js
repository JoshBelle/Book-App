import { v4 as uuid } from "uuid"

const createBookWithId = (book) => {
    return {
        ...book,
        isFavourite: false,
        id: uuid()
    }
}

export default createBookWithId