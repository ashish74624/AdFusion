import Section from '@/components/Section';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger, useModal } from '@/components/ui/animated-modal';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { base_url } from '@/utils/baseUrl';
import  { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [publisherList,setPublisherList] = useState<number[]>([]);
  


  async function fetchPublishers() {
    try {
      const response = await fetch(`${base_url}/publisher/list`);
      const data = await response.json();
      setPublishers(data.publishers);
      setOpen(false)

    } catch (error) {
      console.error('Failed to fetch publishers:', error);
    }
  }
  useEffect(() => {
    fetchPublishers();
  }, []);


  const { setOpen } = useModal();


  const createPublisher=async()=>{
    try {
      const res = await fetch(`${base_url}/publisher/create`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name:newName,
          domain:newDomain
        })
      })

      if(res.ok){
        setOpen(false);
        toast.success("Creation Successful");
        fetchPublishers();
      }
    } catch  {
      toast.error("Failed to create new Publisher at the monent");
    }
  }

  
  function togglePublisherSelection(pid: number): void {
    if (publisherList.includes(pid)) {
      setPublisherList(publisherList.filter(id => id !== pid));
    } else {
      setPublisherList([...publisherList, pid]);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`${base_url}/publisher/delete`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          ids: publisherList
        })
      })

      if(res.ok){
        toast.success("Delete Success");
        fetchPublishers();
      }
    } catch {
      toast.error("Delete failed");
    }
  }

      const navigate = useNavigate();
  

  return (
    <Section >
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
              <Button onClick={()=>createPublisher()}>
                Create
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
            {publishers.map((publisher) => (
              <TableRow key={publisher._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={publisherList.includes(publisher.id)}
                    onChange={() => togglePublisherSelection(publisher.id)}
                  />
                </TableCell>
                <TableCell className='text-blue-500 hover:underline cursor-pointer' onClick={() => navigate(`/admin/publisher/view?publisher_id=${publisher.id}`)}>
                 
                    {publisher.name}
              
                </TableCell>
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
          disabled={publisherList.length===0}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Section>
  );
}
