import '../Hero.css'
import '../globals.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Hero = () => {
  return (
    <div className="relative flex">
      {/* Image container */}
      <div className="flex-grow w-1/2 relative">
        <img
          src="src/images/date-hero.png"
          alt="Hero Image"
          className="w-full h-full object-cover"
        />

        {/* Blur overlay on top of the image */}
        <div className="absolute bottom-0 inset-x-0 backdrop-blur-sm h-1/4"></div>
        <div className="absolute inset-0 flex-grow-0 backdrop-blur-sm w-[60%]"></div>

        {/* Card container positioned in the top left corner with a custom margin-top */}
        <div className="absolute top-[15%] left-0 right-0 mx-auto mt-1
        xs:mt-1
        sm:mt-1 sm:ml-12 sm:max-w-sm
        md:mt-1 md:ml-12 md:max-w-md 
        lg:mt-1 lg:max-w-lg xl:mt-1 xl:max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>DatePalm</CardTitle>
              <CardDescription>Welcome to DatePalm! The place for couples to go when they don't know where to go.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Why?</p>
              <p className="text-sm text-muted-foreground">Finding a date idea can be hard! My girlfriend and I often find ourselves doing the same few things for date night, and it is NOT easy finding other easy, accessible, and affordable alternatives. So that's why I built this :)</p>
            </CardContent>
            <CardContent>
              <p>How?</p>
              <p className="text-sm text-muted-foreground">By using AI, of course! (Shoutout to using AI for good lol)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
