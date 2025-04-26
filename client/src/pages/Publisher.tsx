'use client';

import Section from '@/components/Section';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from '@/components/ui/animated-modal';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState, useEffect } from 'react';

interface Zone {
  _id: string;
  id: number;
}

interface Publisher {
  _id: string;
  id: number;
  object: string;
  name: string;
  domain: string;
  zones: Zone[];
}

export default function Publishers() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('');

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const response = await fetch('http://localhost:3001/publisher/list');
        const data = await response.json();
        setPublishers(data.publishers);
      } catch (error) {
        console.error('Failed to fetch publishers:', error);
      }
    }
    fetchPublishers();
  }, []);

  return (
    <Section className="w-full h-full p-6">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold mb-6">Publishers</h3>
        <Modal>
          <ModalTrigger>
            <Button>

              Add New
            </Button>
          </ModalTrigger>
          <ModalBody>
            <ModalContent>
              <h2 className="text-xl font-semibold mb-4">New Publisher</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="publisher-name-input">
                    Name
                  </label>
                  <input
                    id="publisher-name-input"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="publisher-domain-input">
                    Domain
                  </label>
                  <input
                    id="publisher-domain-input"
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="example.com"
                  />
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="gap-4">
              <Button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Book Now
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>


      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Zones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publishers.map((publisher, index) => (
              <TableRow key={publisher._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.zones.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Button */}
      <div className="mt-6">
        <Button
          id="publisher-delete-button"
          variant="destructive"
        // Implement delete logic here
        >
          🗑️ Delete
        </Button>
      </div>
    </Section>
  );
}
