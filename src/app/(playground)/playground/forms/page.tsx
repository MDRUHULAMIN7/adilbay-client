'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export default function FormsPlayground() {
  const [radioVal, setRadioVal] = useState('card');
  const [switchVal, setSwitchVal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading level={1} variant="display">Form Elements</Heading>
        <Text variant="large" className="text-muted-foreground">
          Showcase of fields, switches, selections, and checkboxes supporting dynamic validations.
        </Text>
      </div>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Inputs</Heading>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <Input label="Default Text Input" placeholder="Enter username..." helperText="Username must be unique." />
            <Input label="Password Input" type="password" placeholder="Enter password..." />
            <Input label="Input with Prefix & Suffix" prefix={<Icon name="Search" className="h-4 w-4" />} suffix={<span className="text-xs font-semibold">USD</span>} placeholder="Search budget..." />
            <Input label="Validation Success State" validationState="success" placeholder="Correct email..." helperText="Email matches records." />
            <Input label="Validation Warning State" validationState="warning" placeholder="Weak password..." helperText="Password could be stronger." />
            <Input label="Validation Error State" validationState="error" placeholder="Invalid details..." errorMessage="Password must contain at least 6 characters." />
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Textareas</Heading>
        <Card>
          <CardContent className="flex flex-col gap-6 py-6">
            <Textarea label="Standard Textarea" placeholder="Enter shipping instructions..." />
            <Textarea label="Auto-Resizing Textarea" autoResize placeholder="Start typing multi-line contents here..." helperText="Height dynamically increases as you type." />
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Selections & Toggles</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Checkboxes</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Checkbox label="Agree to terms" description="Read and accept standard agreement terms." />
              <Checkbox label="Opt-in newsletter" />
              <Checkbox label="Errors checkbox" isError errorMessage="This checklist confirmation is mandatory." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Switches</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Switch checked={switchVal} onChange={setSwitchVal} label={switchVal ? "Notifications Enabled" : "Notifications Disabled"} />
              <Switch checked={true} disabled label="Locked / Disabled Switch" />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Radios Group</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <RadioGroup name="playground-payment" value={radioVal} onChange={setRadioVal}>
                <Radio value="card" label="Credit / Debit Card" description="Pay securely via standard credit cards." />
                <Radio value="paypal" label="PayPal Sandbox" description="Redirects to official PayPal authorization panels." />
                <Radio value="cod" label="Cash on Delivery (COD)" description="Pay on arrival." />
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level={3}>Select Wrapper</Heading>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <Select placeholder="Select Wood Category">
              <option value="teak">Teak Wood</option>
              <option value="mahogany">Mahogany Wood</option>
              <option value="oak">Oak Wood</option>
            </Select>

            <Select placeholder="Validation Error Select" validationState="error" errorMessage="Wood selection type is required.">
              <option value="teak">Teak Wood</option>
              <option value="oak">Oak Wood</option>
            </Select>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
