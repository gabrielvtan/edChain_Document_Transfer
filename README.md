
# **edChain Document Transfer dApp**

<img src="./Design_docs/Images_PPTX/stow-logo.png" width="100" height="100" />

## _An implementation of the Stow Protocol empowering edChain_

<img src="./Design_docs/Images_PPTX/edchain-logo.png" width="450" height="75" /> 




## What is Stow?
[Stow](https://stow-protocol.com/) is a decentralized protocol that facilitates the secure storage and sharing of sensitive data. [Stow Getting Started](https://github.com/ConsenSys/stow-resources/blob/master/GETTING_STARTED.md)

## What is EdChain?
[edChain](https://www.edchain.io/) uses a decentralized network and blockchain technology to enable students, educators, and employers to interact directly and participate in the exchange of education and learning, without the involvement of intermediaries. [edChain Getting Started](https://github.com/edchainio/edchain-client-gui/blob/master/README.md)

## Their intersection and purpose of our dApp:
Given recent rapid  improvements in technology, education is increasingly able to move out of the classroom and onto a student's laptop, with profound implications for the democratization of education. A cottage industry has sprung up overnight of middlemen profiting by earning a spread between the fees students pay and the money instructors earn. EdChain works to dissolve that friction, putting more revenue into the account of the teacher and in turn lowering fees for students. But, in order to provide instruction for advanced topics or courses beyond the scope of a few tutorials, an instructor may want to offer financing to increase accessability broadly. Students need a secure way to provide access to confidential documents to loan providers, without relinquishing control of that personal information. Similarly, instructors need a way to share propritary lesson materials, without fear of piracy and redistribution. Our app allows a user to:

- [x] upload confidential or proprietary information to the blockchain
- [x] allow it to be shared
- [x] maintain control of access to that data

To begin, you'll need need a metamask account and extention for your browser: [metamask](https://metamask.io/)

Then to install and launch our DApp: 
```
git clone https://github.com/gabrielvtan/edChain_Document_Transfer.git
npm install
npm start
```







#### #TODO [Scrum table](trello.com/b/Bbyy15e9/edchain-data-transfer-dapp)
TODO                    | Doing                   |            Done
------------------------| ------------------------|------------------------
Front End - User Login Page |Read Me|           Set-up of Dev Environment
Front End - Create Student Permissions| Application - Add Record|
Front End - Create 3rd Party ||
Application - Permission Record ||









## Stow Protocol Tools FAQs
Go [HERE](STOW_PROTOCOL_TOOLS_FAQS.md) to read about the relation between the Stow Protocol and the tools being built around it.

Want to take a deeper dive into what the Stow Protocol is and what it stands for? Check out their [whitepaper](/introducing-linnia.pdf) or their [homepage](https://stow-protocol.com/) for more context.

## Metadata

For every record, Stow Protocol stores Metadata. This Metadata is chosen by the provider or whoever upload the record. The Metadata is completly public and the Stow Server can be used to query the Metadata of the records in order to find specific data. In order to have the data more organized and easy to search we provide specifications on how to write Metadata for you records. Go [HERE](METADATA.md) to check the specs.
