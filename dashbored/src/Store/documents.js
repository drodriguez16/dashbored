const documents = {
    accounts: "/pdfs",
    accountpdfs: ({ email }) => { return `/pdfs/${email}`; }, //todo: Parameter no resolved
    pdf: ({ email, pdfId }) => { return `/pdfs/${email}/${pdfId}` },//todo: Parameter no resolved
    transactionQueue: ({ email, pdfId }) => { return `/pdfs/${email}/${pdfId}/transactionQueue/` },//todo: Parameter no resolved
    transactions: ({ email, pdfId }) => { return `/pdfs/${email}/${pdfId}/Transactions` },//todo: Parameter no resolved
    transaction: ({ email, pdfId, transId }) => { return `/pdfs/${email}/${pdfId}/Transactions/${transId}` },//todo: Parameter no resolved
    settings: (user) => { return `/pdfs/${user.email.replace(".", "")}/Settings`; },
}

export { documents }