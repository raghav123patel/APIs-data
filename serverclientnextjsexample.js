Skip to content
You said:
give the example of server and client component in nextjs with its implementation and explanation full details in hindi
ChatGPT said:
Next.js में Server और Client Components को अलग-अलग प्रकार की rendering behavior को संभालने के लिए उपयोग किया जाता है। यह Next.js 13 और उसके बाद के संस्करणों में App Router के साथ introduce किया गया था। आइए हम इसे विस्तार से हिंदी में समझते हैं, और एक-एक करके Server Component और Client Component के उदाहरण और उनका implementation देखें।

🧠 Server और Client Component क्या होते हैं?
🔹 विशेषता	🔹 Server Component	🔹 Client Component
कहां render होता है	Server पर	Client (Browser) पर
JavaScript भेजता है?	❌ नहीं	✅ हां
उपयोग	Data Fetching, SEO-friendly pages	Interactivity, Event handling
Hooks support	✅ Server-only hooks (जैसे fetch)	✅ Client-only hooks (जैसे useState, useEffect)
✅ 1. Server Component का उदाहरण
लक्षण:

Default रूप से Next.js के सभी components Server Components होते हैं जब तक कि हम उन्हें explicitly "use client" नहीं लिखते।

📂 फ़ोल्डर संरचना:
app/
  └── page.tsx
  └── components/
         └── ServerComponent.tsx
📄 components/ServerComponent.tsx
// ServerComponent.tsx (कोई 'use client' नहीं है इसलिए यह Server Component है)
import React from 'react';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();
  return data;
}

const ServerComponent = async () => {
  const data = await getData();

  return (
    <div>
      <h2>यह एक Server Component है</h2>
      <p>Title: {data.title}</p>
      <p>Body: {data.body}</p>
    </div>
  );
};

export default ServerComponent;
📄 app/page.tsx
import ServerComponent from './components/ServerComponent';

export default function HomePage() {
  return (
    <main>
      <h1>मुख्य पृष्ठ</h1>
      <ServerComponent />
    </main>
  );
}
🧾 Explanation (व्याख्या):
ServerComponent.tsx में कोई "use client" directive नहीं है, इसलिए यह server पर ही render होता है।

इसमें हमने async data fetching (fetch) की जो केवल server पर संभव है।

यह SEO के लिए अच्छा है क्योंकि HTML server से pre-render हो कर आता है।

✅ 2. Client Component का उदाहरण
लक्षण:

"use client" directive सबसे ऊपर जरूरी है।

इसमें browser-specific logic जैसे कि state management (useState) या event handling होता है।

📄 components/ClientComponent.tsx
'use client';

import React, { useState } from 'react';

const ClientComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>यह एक Client Component है</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>बढ़ाएं</button>
    </div>
  );
};

export default ClientComponent;
📄 app/page.tsx (same file, both components use)
import ServerComponent from './components/ServerComponent';
import ClientComponent from './components/ClientComponent';

export default function HomePage() {
  return (
    <main>
      <h1>मुख्य पृष्ठ</h1>
      <ServerComponent />
      <ClientComponent />
    </main>
  );
}
🧾 Explanation (व्याख्या):
"use client" का मतलब है कि यह component browser पर render होगा।

इसमें हम useState जैसे React Hooks का उपयोग कर सकते हैं।

यह इंटरएक्टिव होता है जैसे बटन क्लिक इत्यादि।

🔄 Server और Client को मिलाकर उपयोग करना
Client Components को आप Server Components के अंदर इस्तेमाल नहीं कर सकते सीधे, लेकिन आप उन्हें props देकर communication कर सकते हैं।

❌ गलत तरीका:
// ❌ ServerComponent.jsx में client component को import करना (गलत है)
import ClientComponent from './ClientComponent'; // ERROR देगा
✅ सही तरीका:
ServerComponent को सिर्फ data दिखाने के लिए उपयोग करें।

ClientComponent को event या interaction के लिए उपयोग करें।

📌 निष्कर्ष (Conclusion)
Point	Server Component	Client Component
उपयोग	Static + dynamic data fetching, SEO	UI interaction, animations
प्रदर्शन	तेज़ (no JS in client)	थोड़ा भारी (JS bundle भेजता है)
Hooks	fetch, server-side logic	useState, useEffect, etc
अगर आपको यह structure तैयार करना है:
npx create-next-app@latest my-app --experimental-app
cd my-app
npm run dev
फिर app/ directory में ऊपर के components बनाएं।

अगर आप चाहें तो मैं एक पूरा GitHub-ready उदाहरण या CodeSandbox लिंक भी बना सकता हूँ। बताएं 😊



Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.
Skip to content
You said:
server component and client component explain it with api fetching example in nextjs along with the explanation and full details in hindi
ChatGPT said:
Next.js में Server Components और Client Components का कॉन्सेप्ट React 18 के साथ introduce किया गया है। इससे हम बेहतर तरीके से performance optimize कर सकते हैं और user experience को smooth बना सकते हैं।

🔹 Server Components और Client Components क्या होते हैं?
✅ Server Component:
ये components server पर render होते हैं।

इन्हें ब्राउज़र पर नहीं भेजा जाता।

ये directly database या backend APIs से data fetch कर सकते हैं।

इनका JavaScript client तक नहीं भेजा जाता, जिससे performance बेहतर होती है।

✅ Client Component:
ये components ब्राउज़र (client-side) पर render होते हैं।

Interactivity (जैसे button clicks, form input, etc.) के लिए client components की ज़रूरत होती है।

इन्हें "use client" directive के साथ define किया जाता है।

📦 Example: API Fetching के साथ Server और Client Component (Hindi में पूरा समझाया गया)
🧱 Project Structure:
app/
 ┣ page.tsx              <-- Home Page
 ┣ components/
    ┣ ServerData.tsx     <-- Server Component
    ┣ ClientData.tsx     <-- Client Component
🟩 Step 1: एक Fake API बनाएँ या JSONPlaceholder यूज़ करें
API: https://jsonplaceholder.typicode.com/posts/1

🟦 Server Component: ServerData.tsx
// app/components/ServerData.tsx
import React from 'react';

async function fetchPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();
  return data;
}

export default async function ServerData() {
  const post = await fetchPost();

  return (
    <div style={{ border: '1px solid green', padding: '10px' }}>
      <h2>📡 Server Component Data</h2>
      <p><strong>Title:</strong> {post.title}</p>
      <p><strong>Body:</strong> {post.body}</p>
    </div>
  );
}
🔹 Explanation in Hindi:

ये component server पर run होता है।

fetch() server-side होता है, यानी यह client तक नहीं जाता।

API call backend पर होती है, जिससे security और speed दोनों मिलती हैं।

🟨 Client Component: ClientData.tsx
// app/components/ClientData.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function ClientData() {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(data => setPost(data));
  }, []);

  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <h2>💻 Client Component Data</h2>
      {post ? (
        <>
          <p><strong>Title:</strong> {post.title}</p>
          <p><strong>Body:</strong> {post.body}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
🔹 Explanation in Hindi:

ये component client/browser में run होता है।

useEffect() के अंदर API call होती है यानी यह page load के बाद call होती है।

Interactivity (जैसे किसी event पर fetch करना) client component से manage होता है।

🔶 Main Page (app/page.tsx)
// app/page.tsx
import ServerData from './components/ServerData';
import ClientData from './components/ClientData';

export default function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Next.js 13 - Server vs Client Components</h1>
      <ServerData />
      <br />
      <ClientData />
    </div>
  );
}
🔍 Summary (सारांश):
Feature	Server Component	Client Component
Render Location	Server	Browser (Client)
Data Fetching	Server-side (directly with fetch)	useEffect के अंदर client-side
Performance	Fast (no JS sent to client)	Slower (JS sent to client)
Interactivity	❌ No	✅ Yes
Use Case	Static data, SEO friendly content	User input, dynamic interactivity
Directive Required?	❌ No	✅ "use client"
✅ कब क्या यूज़ करें?
जरूरत	Component
SEO, Fast load, Static data	Server Component
User interaction, Events	Client Component
अगर आप चाहें तो मैं इस पूरे code का GitHub या zip structure भी बना सकता हूँ। बताएं अगर चाहिए।

Also, अगर आप चाहें तो इसी example को Next.js 14 या App Router, SSR, ISR के साथ भी दिखा सकता हूँ।



Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.


