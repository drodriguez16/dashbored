const documents = {
    accounts: "/pdfs",
    accountpdfs: ({ user }) => { return `Accounts/${user.email.replace(".", "")}/pdfs/`; }, //todo: Parameter no resolved
    pdf: ({ user, pdfId }) => { return `Accounts/${user.email.replace(".", "")}/pdfs/${pdfId}` },//todo: Parameter no resolved
    transactionQueue: ({ user, pdfId }) => { return `Accounts/${user.email.replace(".", "")}/pdfs/${pdfId}/transactionQueue/` },//todo: Parameter no resolved
    transactions: ({ user, pdfId }) => { return `Accounts/${user.email.replace(".", "")}/pdfs/${pdfId}/Transactions` },//todo: Parameter no resolved
    transaction: ({ user, pdfId, transId }) => { return `Accounts/${user.email.replace(".", "")}/pdfs/${pdfId}/Transactions/${transId}` },//todo: Parameter no resolved
    settings: (user) => { return `Accounts/${user.email.replace(".", "")}/Settings` },
    CurrentUser: (user) => { return `Accounts/${user.email.replace(".", "")}/User` },
    contactBook: (user) => { return `Accounts/${user.email.replace(".", "")}/ContactBooks/` },

}

export { documents }