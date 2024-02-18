import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { firestore } from '@/firebase/firebase';
import { currentUserQuery } from '@/firebase/query';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    })
    .optional(),
  dob: z
    .string({
      required_error: 'A date of birth is required.',
    })
    .optional(),
  language: z
    .string({
      required_error: 'Please select a language.',
    })
    .optional(),
  street: z.string().min(2, { message: 'Street must have at least 2 characters.' }).optional(),
  postalCode: z
    .string({ required_error: 'Put #0000 incase you don&apos;t have or know your postal code.' })
    .max(20)
    .min(4)
    .optional(),
  state: z
    .string({ required_error: 'Province incase you don&apos;t have state in your country' })
    .min(1)
    .max(150)
    .optional(),
  country: z.string({ required_error: 'The name of your country' }).max(50).min(2).optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.

interface AccountPageProps {
  currentUser: User;
}

const AccountPage: React.FC<AccountPageProps> = ({ currentUser }) => {
  const { setSessionData } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: AccountFormValues) => {
    const userDocRef = doc(firestore, 'users', currentUser.uid);
    await updateDoc(userDocRef, {
      fullName: data.name,
      dateBirth: data.dob,
      lang: data.language,
      streetName: data.street,
      postalCode: data.postalCode,
      stateprovince: data.state,
      country: data.country,
    });
    await currentUserQuery(currentUser.uid, setSessionData);
  };

  const defaultValues: Partial<AccountFormValues> = {
    name: currentUser.fullName,
    language: currentUser.lang,
    street: currentUser.streetName,
    postalCode: currentUser.postalCode,
    state: currentUser.stateprovince,
    country: currentUser.country,
    dob: currentUser.dateBirth,
  };
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: AccountFormValues) => {
    setIsLoading(true);
    await handleFormSubmit(data);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Informations</h3>
      </div>
      <Separator />
      {/* <AccountForm /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>This is your real name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input placeholder="Your date of birth ..." {...field} />
                </FormControl>
                <FormDescription>
                  Your date of birth is used to calculate your age. Ex: 1999-02-28
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}>
                        {field.value
                          ? languages.find(language => language.value === field.value)?.label
                          : 'Select language'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map(language => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value);
                            }}>
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                language.value === field.value ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the language that will be used for your messages.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Your street name" {...field} />
                </FormControl>
                <FormDescription>Ex: 123 street ABC </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormDescription>The region or state.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="1012354" {...field} />
                </FormControl>
                <FormDescription>Important for a precise location.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Nigeria" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? 'Updating' : 'Update account'}</Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountPage;
