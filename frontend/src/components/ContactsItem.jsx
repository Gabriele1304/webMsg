export default function ContactsItem({contact, index, selectChat} ) {
    return (
            <div style={{display:"flex",padding:"10px"}}>
                <label key={"contact_"+index} className="contact_item" onClick={(e) => selectChat(contact)}><h1>{contact}</h1></label>
            </div>
        )
}
