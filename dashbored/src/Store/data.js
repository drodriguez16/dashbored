
const init = {
  InputRecipient: "",
  AddNew: false,
  Contacts: [{ email: 'Dioscarr@gmail.com' }, { email: 'KellenOcana87@gmail.com' }, { email: 'DionelRodriguez16@gmail.com' }, { email: '3472009415@tmomail.net' }],
  Settings: { isSettings: false },
  PdfSettings: { isSettings: false, AssignRecipient: false, Recipient: '' },
  CurrentUser: { email: "", avatar: "", name: "", logged: false },
  fdbInitialized: false,
  SignedIn: false,
  Loading: true,
  pdfs: [],
  filebyrd: [],
  pdf: {
    name: "",
    uploadedBy: "",
    createdAt: null,
    size: 0
  }
}
const data = { ...init }
export { init }
export default data
