import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormList } from "@/components/FormList";

const Index = () => {
  const [view, setView] = useState<"list" | "create">("list");
  const [forms, setForms] = useState<Array<{ id: string; title: string; description: string; createdAt: Date }>>([
    {
      id: "1",
      title: "Customer Feedback",
      description: "Collect feedback from customers about our new product",
      createdAt: new Date(2023, 5, 15)
    },
    {
      id: "2",
      title: "Event Registration",
      description: "Registration form for our upcoming conference",
      createdAt: new Date(2023, 6, 22)
    }
  ]);

  const handleCreateForm = () => {
    setView("create");
  };

  const handleSaveForm = (formData: { title: string; description: string }) => {
    const newForm = {
      id: Math.random().toString(36).substring(2, 9),
      title: formData.title,
      description: formData.description,
      createdAt: new Date()
    };
    
    setForms([newForm, ...forms]);
    setView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">FormCraft</h1>
          {view === "list" && (
            <Button onClick={handleCreateForm}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Form
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === "list" ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Forms</h2>
              <p className="text-gray-600">Create, manage, and share your forms</p>
            </div>
            <FormList forms={forms} />
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create a New Form</h2>
              <p className="text-gray-600">Design your form with our easy-to-use builder</p>
            </div>
            <FormBuilder onSave={handleSaveForm} onCancel={() => setView("list")} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;