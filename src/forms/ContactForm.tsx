import { Button } from '@/components/ui/button'
import * as z from "zod"
import emailjs from 'emailjs-com'; 

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader } from 'lucide-react'
import { Label } from '@/components/ui/label'
import '../globals.css'
import { Textarea } from '@/components/ui/textarea'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const formSchema = z.object({
    message: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
})

const ContactForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          message: "",
        },
    });

    async function sendEmail(values: z.infer<typeof formSchema>) {
        try {
          // Send email using emailjs
          await emailjs.send(
            'datepalm_emailjs', // replace with your service_id
            'template_zaenqd8', // replace with your template_id
            values, // template parameters (e.g., values.email, values.message)
            '1dIk9hnRN5Wb1McdX', // replace with your user_id
          );
    
          console.log('Email sent successfully!');
        } catch (error) {
          console.error('Error sending email:', error);
        }
    }
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted");
    
        // Call the function to send email
        await sendEmail(values);
    }

    return (
        <Card className="mt-12 w-[350px] mx-auto mb-12">
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
            <CardDescription>Send me an email! Just complete this form and I'll get back to you ASAP.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your email address" {...form.register('email')} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" {...form.register('message')} />
                </div>
              </div>
              <CardFooter className="flex justify-between"> {/* Use 'justify-end' to move buttons to the right */}
                <Button variant="outline" className='mt-8'>Cancel</Button> {/* Use 'ml-2' to add left margin */}
                <Button type="submit" className='mt-9'>Send</Button>
            </CardFooter>           
            </form>
          </CardContent>
        </Card>
    );
}

export default ContactForm