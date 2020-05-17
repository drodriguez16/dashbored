const data = {
  InputRecipient: "",
  AddNew: false,
  Contacts: [{ email: 'Dioscarr@gmail.com' }, { email: 'KellenOcana87@gmail.com' }, { email: 'DionelRodriguez16@gmail.com' }, { email: '3472009415@tmomail.net' }],
  Settings: { isSettings: false, fullname: '', AvatarName: 'Avatar.jpg' },
  PdfSettings: { isSettings: false, AssignRecipient: false, Recipient: '' },
  CurrentUser: {},
  fdbInitialized: false,
  SignedIn: false,
  Loading: true,
  pdfs: [],
  pdf: {
    name: "",
    uploadedBy: "",
    createdAt: null,
    size: 0
  }
}
export default data