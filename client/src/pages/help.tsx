import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Help() {
  const faqs = [
    {
      question: "How is the efficiency score calculated?",
      answer: "The efficiency score is a composite metric that evaluates how effectively departments utilize their resources to achieve outcomes. It combines factors such as budget utilization, project completion rates, operational costs, and service delivery metrics. The score ranges from 0-100, with higher numbers indicating greater efficiency."
    },
    {
      question: "What does the 'waste analysis' page show?",
      answer: "The waste analysis page identifies potential inefficiencies, redundancies, and opportunities for cost savings across government departments. It breaks down waste by category, department, and program while providing detailed interventions with ROI calculations to address the identified waste."
    },
    {
      question: "How can I export data from the dashboard?",
      answer: "Most pages include an 'Export' or 'Export Report' button that allows you to download the current view as a CSV, Excel, or PDF file. You can also export specific charts by clicking the three-dot menu in the top-right corner of each chart and selecting 'Download'."
    },
    {
      question: "How frequently is the data updated?",
      answer: "The DOGE dashboard updates data daily for most metrics. Historical trends and some complex analytical metrics may be updated weekly. Each visualization includes a timestamp indicating when the data was last refreshed."
    },
    {
      question: "Can I create custom reports?",
      answer: "Yes, the Reports section allows you to create and save custom reports by selecting specific metrics, departments, timeframes, and visualization types. You can also schedule regular delivery of these reports to your email."
    },
    {
      question: "What does the 'Performance' page measure?",
      answer: "The Performance page provides a comprehensive analysis of how well departments are functioning across multiple dimensions. It includes metrics on operational efficiency, budget utilization, program effectiveness, service delivery, and innovation efforts."
    },
    {
      question: "How do I compare multiple departments?",
      answer: "Use the Comparison page to conduct side-by-side analysis of two departments. You can select departments from the dropdown menus at the top of the page and compare them across efficiency, spending, performance metrics, and other key indicators."
    },
    {
      question: "What is the difference between 'efficiency' and 'effectiveness'?",
      answer: "Efficiency measures how well resources (time, money, personnel) are utilized to achieve outputs, focusing on the ratio of resources used to results produced. Effectiveness measures how well the outputs achieve the intended outcomes and policy goals, regardless of resource utilization."
    },
    {
      question: "How are the recommended interventions determined?",
      answer: "Recommended interventions are identified through analysis of historical patterns, current inefficiencies, and potential savings opportunities. Each intervention is evaluated based on implementation complexity, cost, timeframe, and expected return on investment (ROI)."
    },
    {
      question: "Can I filter the data by fiscal year?",
      answer: "Yes, most pages include a fiscal year filter in the top navigation bar. You can select different years to view historical data and trends over time."
    }
  ];

  const guides = [
    {
      title: "Getting Started with DOGE Dashboard",
      description: "Learn the basics of navigating and using the DOGE Dashboard to analyze government efficiency data.",
      icon: "ri-dashboard-line"
    },
    {
      title: "Interpreting Efficiency Metrics",
      description: "Understand how to read and interpret the various efficiency and performance metrics throughout the dashboard.",
      icon: "ri-bar-chart-grouped-line"
    },
    {
      title: "Creating Custom Reports",
      description: "Step-by-step instructions for building, saving, and scheduling custom analytical reports.",
      icon: "ri-file-chart-line"
    },
    {
      title: "Using Comparison Tools",
      description: "Learn how to effectively compare departments, programs, and spending categories.",
      icon: "ri-scales-line"
    },
    {
      title: "Waste Analysis Methodology",
      description: "Detailed explanation of how waste is identified, categorized, and quantified in the system.",
      icon: "ri-funds-box-line"
    },
    {
      title: "Exporting and Sharing Data",
      description: "Instructions for exporting, downloading, and sharing dashboard data and visualizations.",
      icon: "ri-download-cloud-line"
    }
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Contact our technical support team for assistance with your DOGE Dashboard account.",
      icon: "ri-mail-line",
      action: "Email Support Team",
      link: "mailto:support@doge.gov"
    },
    {
      title: "Live Chat",
      description: "Chat with a support representative for immediate assistance during business hours.",
      icon: "ri-chat-1-line",
      action: "Start Chat",
      link: "#"
    },
    {
      title: "Phone Support",
      description: "Call our dedicated support line for urgent issues or complex questions.",
      icon: "ri-phone-line",
      action: "Call Support",
      link: "tel:+18005551234"
    },
    {
      title: "Training Sessions",
      description: "Register for live or recorded training sessions on using the DOGE Dashboard effectively.",
      icon: "ri-user-voice-line",
      action: "View Schedule",
      link: "#"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-sm text-gray-600 mt-1">
            Find answers to common questions, tutorials, and support resources
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">How can we help you today?</h2>
          <div className="flex gap-2">
            <Input placeholder="Search for help articles, guides, and FAQs..." className="max-w-xl" />
            <Button>Search</Button>
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="guides">Guides & Tutorials</TabsTrigger>
            <TabsTrigger value="support">Contact Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Questions</CardTitle>
                <CardDescription>
                  Find answers to frequently asked questions about the DOGE Dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="py-4 text-left font-medium">{faq.question}</AccordionTrigger>
                      <AccordionContent className="py-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                        <i className={guide.icon}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                        <Button variant="outline" className="w-full">View Guide</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Watch step-by-step video tutorials on using the DOGE Dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <i className="ri-video-line text-4xl text-gray-400"></i>
                    </div>
                    <h3 className="font-medium">Dashboard Navigation Tutorial</h3>
                    <p className="text-sm text-gray-600">Learn how to navigate between different sections and use core features.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <i className="ri-video-line text-4xl text-gray-400"></i>
                    </div>
                    <h3 className="font-medium">Data Analysis Workflows</h3>
                    <p className="text-sm text-gray-600">Advanced techniques for analyzing efficiency data and generating insights.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <i className="ri-video-line text-4xl text-gray-400"></i>
                    </div>
                    <h3 className="font-medium">Custom Reporting Tutorial</h3>
                    <p className="text-sm text-gray-600">How to create, save, and schedule custom reports for your team.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get in touch with our support team for assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {supportOptions.map((option, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-none w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <i className={option.icon}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{option.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                        <a href={option.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                          {option.action}
                          <i className="ri-arrow-right-line"></i>
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Support Request</CardTitle>
                  <CardDescription>
                    Fill out the form below to get assistance from our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="Brief description of your issue" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Describe your issue or question in detail"
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                      <select 
                        id="priority" 
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="low">Low - General question</option>
                        <option value="medium">Medium - Need assistance soon</option>
                        <option value="high">High - System issue affecting work</option>
                        <option value="urgent">Urgent - Critical issue</option>
                      </select>
                    </div>
                    
                    <Button className="w-full">Submit Support Request</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Frequently Requested Support Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <a href="#" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                    <i className="ri-lock-line text-xl text-gray-500"></i>
                    <span className="font-medium">Account Access Issues</span>
                  </a>
                  <a href="#" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                    <i className="ri-database-2-line text-xl text-gray-500"></i>
                    <span className="font-medium">Data Import Problems</span>
                  </a>
                  <a href="#" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                    <i className="ri-file-chart-line text-xl text-gray-500"></i>
                    <span className="font-medium">Custom Report Creation</span>
                  </a>
                  <a href="#" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                    <i className="ri-upload-cloud-line text-xl text-gray-500"></i>
                    <span className="font-medium">Data Export Options</span>
                  </a>
                  <a href="#" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                    <i className="ri-user-settings-line text-xl text-gray-500"></i>
                    <span className="font-medium">User Permissions</span>
                  </a>
                  <a href="#" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                    <i className="ri-notification-line text-xl text-gray-500"></i>
                    <span className="font-medium">Alert Configuration</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}