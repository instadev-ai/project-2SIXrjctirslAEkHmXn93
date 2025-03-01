import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/FormField";
import { PlusCircle, ArrowLeft, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormBuilderProps {
  onSave: (formData: { title: string; description: string }) => void;
  onCancel: () => void;
}

export function FormBuilder({ onSave, onCancel }: FormBuilderProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<Array<{ id: string; type: string; label: string; placeholder?: string; required: boolean }>>([
    { id: "1", type: "text", label: "Name", placeholder: "Enter your name", required: true },
    { id: "2", type: "email", label: "Email", placeholder: "Enter your email", required: true }
  ]);
  const [activeTab, setActiveTab] = useState("build");

  const handleAddField = (type: string) => {
    const newField = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      label: getDefaultLabel(type),
      placeholder: getDefaultPlaceholder(type),
      required: false
    };
    setFields([...fields, newField]);
  };

  const handleUpdateField = (id: string, updates: Partial<typeof fields[0]>) => {
    setFields(fields.map(field => field.id === id ? { ...field, ...updates } : field));
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a form title");
      return;
    }
    onSave({ title, description });
  };

  const getDefaultLabel = (type: string): string => {
    switch (type) {
      case "text": return "Text Question";
      case "email": return "Email";
      case "number": return "Number";
      case "textarea": return "Long Text";
      case "select": return "Dropdown";
      case "radio": return "Multiple Choice";
      case "checkbox": return "Checkboxes";
      case "date": return "Date";
      default: return "Question";
    }
  };

  const getDefaultPlaceholder = (type: string): string => {
    switch (type) {
      case "text": return "Enter your answer";
      case "email": return "Enter your email";
      case "number": return "Enter a number";
      case "textarea": return "Type your answer here";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="build">Build</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="build" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Form Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter form title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Enter form description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Form Fields</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleAddField("text")}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Text
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddField("textarea")}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Paragraph
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddField("select")}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Dropdown
                </Button>
              </div>
            </div>

            {fields.map((field, index) => (
              <FormField
                key={field.id}
                field={field}
                index={index}
                onUpdate={(updates) => handleUpdateField(field.id, updates)}
                onRemove={() => handleRemoveField(field.id)}
              />
            ))}

            {fields.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500 mb-4">No fields added yet</p>
                  <Button variant="outline" onClick={() => handleAddField("text")}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Your First Question
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{title || "Untitled Form"}</CardTitle>
              {description && <p className="text-gray-600 mt-2">{description}</p>}
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`preview-${field.id}`}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea 
                      id={`preview-${field.id}`} 
                      placeholder={field.placeholder} 
                      disabled 
                    />
                  ) : field.type === "select" ? (
                    <select 
                      id={`preview-${field.id}`}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled
                    >
                      <option value="">Select an option</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  ) : (
                    <Input 
                      id={`preview-${field.id}`} 
                      type={field.type} 
                      placeholder={field.placeholder} 
                      disabled 
                    />
                  )}
                </div>
              ))}

              {fields.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No fields to preview</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button disabled>Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Forms
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />
          Save Form
        </Button>
      </div>
    </div>
  );
}