/*
 Copyright (C) 2005 SKYRIX Software AG
 
 This file is part of OpenGroupware.org.
 
 OGo is free software; you can redistribute it and/or modify it under
 the terms of the GNU Lesser General Public License as published by the
 Free Software Foundation; either version 2, or (at your option) any
 later version.
 
 OGo is distributed in the hope that it will be useful, but WITHOUT ANY
 WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
 License for more details.
 
 You should have received a copy of the GNU Lesser General Public
 License along with OGo; see the file COPYING.  If not, write to the
 Free Software Foundation, 59 Temple Place - Suite 330, Boston, MA
 02111-1307, USA.
*/


function unescapeCallbackParameter(s) {
  if(!s || s.length == 0)
    return s;
  s = s.replace(/&apos;/g, "'");
  s = s.replace(/&quot;/g, '"');
  return s;
}

function copyContact(type, email, uid, sn,
                     cn, givenName, telephoneNumber, facsimileTelephoneNumber,
		     mobile, postalAddress, homePostalAddress, 
		     departmentNumber, l)
{
    //  var type = arguments[0]; 
    //  var email = arguments[1]; 
    //  var uid = arguments[2]; 
    //  var sn = arguments[3]; 
    //  var givenName = arguments[4]; 
    //  var telephoneNumber = arguments[5]; 
    //  var facsimileTelephoneNumber = arguments[6]; 
    //  var mobile = arguments[7]; 
    //  var postalAddress = arguments[8]; 
    //  var homePostalAddress = arguments[9]; 
    //  var departmentNumber = arguments[10]; 
    //  var l = arguments[11]; 
  var e;
  e = $('cn');
  e.setAttribute('value', unescapeCallbackParameter(cn));
  e = $('email');
  e.setAttribute('value', email);
  e = $('sn');
  e.setAttribute('value', unescapeCallbackParameter(sn));
  e = $('givenName');
  e.setAttribute('value', unescapeCallbackParameter(givenName));
  e = $('telephoneNumber');
  e.setAttribute('value', telephoneNumber);
  e = $('facsimileTelephoneNumber');
  e.setAttribute('value', facsimileTelephoneNumber);
  e = $('mobile');
  e.setAttribute('value', mobile);
  e = $('postalAddress');
  e.setAttribute('value', unescapeCallbackParameter(postalAddress));
  e = $('homePostalAddress');
  e.setAttribute('value', unescapeCallbackParameter(homePostalAddress));
  e = $('departmentNumber');
  e.setAttribute('value', unescapeCallbackParameter(departmentNumber));
  e = $('l');
  e.setAttribute('value', unescapeCallbackParameter(l));
};

function validateContactEditor() {
  var e;
  
  e = $('workMail');
  if (e.value.length == 0)
    return true;
  if (uixEmailRegex.test(e.value) != true)
    return confirm(labels.invalidemailwarn);

  e = $('homeMail');
  if (e.value.length == 0)
    return true;
  if (uixEmailRegex.test(e.value) != true)
    return confirm(labels.invalidemailwarn);

  return true;
}

function submitContact(thisForm) {
  var action = $('jsaction');
  action.setAttribute("name", "save:method");
  action.setAttribute("value", "save");

  window.opener.log ("form: " + thisForm);

  window.opener.log ("validating...");
  if (validateContactEditor()) {
    thisForm.submit();
    window.opener.setTimeout("refreshContacts(\""+ window.contactId +"\");", 200);
    window.opener.log ("we close...");
    window.close();
  }
}
