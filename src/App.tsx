import ContactMe from "./components/ContactMe";
import DateIdeaGenerator from "./components/DateIdeaGenerator";
import Hero from "./components/Hero";
import { SeparatorDemo } from "./components/ui/SeparatorDemo";
import { Separator } from "./components/ui/separator";
import './globals.css'

function App() {
  return (
    <div>
      <Hero/>
      <Separator />
      <DateIdeaGenerator />
      <Separator />
      <ContactMe />
      <Separator />
    </div>
  );
}

export default App;
