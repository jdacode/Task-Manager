# Task Manager - JavaScript

![oc](./img/octocat.jpeg = 200x200)
*`[3]`* 
<br><br>
## Demo 

![demo](/img/demo.gif)
<br><br>
## Overview

Task manager web app was specifically designed to test web broser' Local Storage which functions as a permanent storage for users tasks. Some of the features used on the project were:

- **JavaScript**.
- **HTML**.
- **DOM**.
- **querySelector**.
- **Materialize**.
- **Bootstrap**.
- **LocalStorage**.
<br><br>
## HTML Web Storage *`[1]`* 

The Web Storage API provides mechanisms by which browsers can securely store key/value pairs. Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads. The keys and the values are always strings (note that, as with objects, integer keys will be automatically converted to strings). 

> **Note**: It's recommended to use the Web Storage API (**setItem**, **getItem**, **removeItem**, key, length) to prevent the **pitfalls** associated with using plain objects as key-value stores.

- **sessionStorage**: The read-only sessionStorage property accesses a session Storage object for the current origin. sessionStorage is similar to localStorage; the difference is that while data in localStorage doesn't expire, data in sessionStorage is cleared when the page session ends.

- **localStorage**: The read-only localStorage property allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions. localStorage is similar to sessionStorage, except that while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the page session ends — that is, when the page is closed. (Data in a localStorage object created in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.)

<br><br>

| Web Storage API                                   | Summary       | Limit       |
|--------------------------------------------|--------------------------|--------------------------|
| **Window.sessionStorage**                         | - Shared between all tabs and windows with the same origin. <br>- Survives browser restart. | **4KB** |
| **Window.localStorage**                 | - Visible within a browser tab, including iframes from the same origin. <br>- Survives page refresh (but not tab close).            | **5MB** |



> **Note**: In private browsing mode, most data storage is not supported. Local storage data and cookies are still stored, but they are ephemeral — the data is deleted when you close the last private browsing window.

<br><br>
## Security *`[2]`*


- **It can only store string data.** This makes it pretty useless for storing data that's even slightly more complex than a simple string. And sure, you could serialize everything including data types into local storage, but that's an ugly hack.

- **It is synchronous.** This means each local storage operation you run will be one-at-a-time. For complex applications this is a big no-no as it'll slow down your app's runtime.

- **It can't be used by web workers.** This means that if you want to build an application that takes advantage of background processing for performance, chrome extensions, things like that: you can't use local storage at all since it isn't available to the web workers.

- **It still limits the size of data you can store (~5MB across all major browsers).** This is a fairly low limit for people building apps that are data intensive or need to function offline.

- **Any JavaScript code on your page can access local storage.** It has no data protection whatsoever. This is the big one for security reasons. 

- **Cross-site scripting attacks (XSS).** If an attacker can run JavaScript on your website, they can retrieve all the data you've stored in local storage and send it off to their own domain. This means anything sensitive you've got in local storage (like a user's session data) can be compromised.

- **Don't Store JSON Web Tokens (JWTs) in Local Storage**. The biggest security offenders I see today are those of us who store JWTs (session data) in local storage. Many people don't realize that JWTs are essentially the same thing as a username/password.

<br><br>
 ## Alternatives to LocalStorage

  - Use server-side sessions for sensitive information
  - For non-sensitive information, choose IndexedDB

If you need to store sensitive data, you should always use a server-side session. Sensitive data includes:

```
    - User IDs
    - Session IDs
    - JWTs
    - Personal information
    - Credit card information
    - API keys
    - And anything else you wouldn't want to publicly share on Facebook
```

If you need to store sensitive data, here's how to do it:

When a user logs into your website, create a session identifier for them and store it in a cryptographically signed cookie. If you're using a web framework. Make sure that whatever cookie library your web framework uses is setting the httpOnly cookie flag. This flag makes it impossible for a browser to read any cookies, which is required in order to safely use server-side sessions with cookies. Make sure that your cookie library also sets the SameSite=strict cookie flag (to prevent CSRF attacks), as well as the secure=true flag (to ensure cookies can only be set over an encrypted connection). Each time a user makes a request to your site, use their session ID (extracted from the cookie they send to you) to retrieve their account details from either a database or a cache (depending on how large your website is). Once you have the user's account info pulled up and verified, feel free to pull any associated sensitive data along with it

### Non-String Data 

- If you need to store data in the browser that isn't sensitive and isn't purely string data, the best option for you is IndexedDB. It's an API that lets you work with a database-esque object store in the browser.

### Offline Data 

- If you need your app to run offline, your best option is to use a combination of IndexedDB (above) along with the Cache API (which is a part of Service Workers).

<br><br>
## Screenshot

![screenshot](/img/screenshot.png)

<br><br>
## References

[1] <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API>

[2] <https://dev.to/rdegges/please-stop-using-local-storage-1i04>

[3] <https://github.blog/2012-02-09-kids-are-the-future-teach-em-to-code/>

<br><br>
## License

> Licensed under the [MIT](license) license.
