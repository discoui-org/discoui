// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  DiscoProvider, 
  Button, 
  ProgressBar, 
  TextBox, 
  PivotPage, 
  PivotItem, 
  Frame,
  Page,
  useDiscoApp
} from '@discoui/react';

function AppContent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello Disco!');
  const app = useDiscoApp();
  const frameRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    if (app && frameRef.current && pageRef.current) {
      // Launch the app with the root frame
      app.launch(frameRef.current);
      // Navigate to the first page
      frameRef.current.navigate(pageRef.current);
    }
  }, [app]);

  return (
    <Frame ref={frameRef}>
      <PivotPage ref={pageRef} appTitle="DISCO REACT">
        {/* @ts-ignore */}
        <PivotItem header="COMPONENTS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1>React Wrappers</h1>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onPress={() => setCount(c => c + 1)}>
                Count is {count}
              </Button>
              <Button onPress={() => setCount(0)}>
                Reset
              </Button>
            </div>

            <div style={{ width: '300px' }}>
              <p>Progress: {count % 100}%</p>
              <ProgressBar value={count % 100} />
            </div>

            <div style={{ width: '300px' }}>
              <p>Text Box:</p>
              {/* @ts-ignore */}
              <TextBox 
                value={text} 
                onInput={(e: any) => setText(e.target.value)} 
              />
              <p>Echo: {text}</p>
            </div>
          </div>
        </PivotItem>

        {/* @ts-ignore */}
        <PivotItem header="ABOUT">
          <div>
            <h2>DiscoUI Ecosystem</h2>
            <p>This is a React application using the @discoui/react wrappers.</p>
            <p>The components are native Web Components under the hood, but feel like React components here.</p>
          </div>
        </PivotItem>
      </PivotPage>
    </Frame>
  );
}

function App() {
  return (
    <DiscoProvider config={{ theme: 'dark', accent: '#00ABA9' }}>
      <AppContent />
    </DiscoProvider>
  );
}


export default App;
