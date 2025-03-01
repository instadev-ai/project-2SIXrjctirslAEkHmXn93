import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Grip, Trash2, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
}

interface FormFieldProps {
  field: Field;
  index: number;
  onUpdate: (updates: Partial<Field>) => void;
  onRemove: () => void;
}

export function FormField({ field, index, onUpdate, onRemove }: FormFieldProps) {
  const [expanded, setExpanded] = useState(false);

  const handleTypeChange = (type: string) => {
    onUpdate({ type });
  };

  const getFieldTypeLabel = (type: string): string => {
    switch (type) {
      case "text": return "Short Text";
      case "email": return "Email";
      case "number": return "Number";
      case "textarea": return "Long Text";
      case "select": return "Dropdown";
      case "radio": return "Multiple Choice";
      case "checkbox": return "Checkboxes";
      case "date": return "Date";
      default: return type;
    }
  };

  return (
    <Card className="border relative">
      <div className="absolute left-3 top-4 cursor-move text-gray-400 hover:text-gray-600">
        <Grip className="h-5 w-5" />
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between py-3 px-6 pl-12 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 text-gray-700">
                {getFieldTypeLabel(field.type)}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleTypeChange("text")}>
                Short Text
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("email")}>
                Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("number")}>
                Number
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("textarea")}>
                Long Text
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("select")}>
                Dropdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange("date")}>
                Date
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" 
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-3 px-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`field-${field.id}-label`}>Question</Label>
            <Input
              id={`field-${field.id}-label`}
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              placeholder="Enter question text"
            />
          </div>
          
          {expanded && (
            <>
              <div className="space-y-2">
                <Label htmlFor={`field-${field.id}-placeholder`}>Placeholder</Label>
                <Input
                  id={`field-${field.id}-placeholder`}
                  value={field.placeholder || ""}
                  onChange={(e) => onUpdate({ placeholder: e.target.value })}
                  placeholder="Enter placeholder text"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor={`field-${field.id}-required`} className="cursor-pointer">
                  Required field
                </Label>
                <Switch
                  id={`field-${field.id}-required`}
                  checked={field.required}
                  onCheckedChange={(checked) => onUpdate({ required: checked })}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}