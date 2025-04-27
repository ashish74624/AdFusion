import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/components/ui/animated-modal';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { base_url } from '@/utils/baseUrl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';

interface Zone {
    id: number;
    name: string;
    width: number;
    height: number;
    publisher: number;
}

interface Campaign {
    id: number;
    name: string;
    advertiser: number;
    total_impressions: number;
}


export default function ZoneManagement() {
    const [selectedTagType, setSelectedTagType] = useState('js');
    const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
    const [searchParams] = useSearchParams();
    const [zone, setZone] = useState<Zone>();
    const [assignedCampaigns, setAssignedCampaigns] = useState<Campaign[]>([]);

    const zoneId = searchParams.get("zone_id");



    const toggleCampaignSelection = (campaignId: number) => {
        if (selectedCampaigns.includes(campaignId)) {
            setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
        } else {
            setSelectedCampaigns([...selectedCampaigns, campaignId]);
        }
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`${base_url}/zone/view?zone_id=${zoneId}}`);
            if (res.ok) {
                const data = await res.json();
                setZone(data.zone);
                setAssignedCampaigns(data.assigned_campaigns);
            }
        } catch {
            toast.error("Failed to fetch data");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleRemoveCampaigns = () => {
        // Logic to remove selected campaigns would go here
        console.log("Removing campaigns with IDs:", selectedCampaigns);
        setSelectedCampaigns([]);
    };

    return (
        <div className="p-4">
            {/* Zone header */}
            <h3 className="text-xl font-light ">
                {zone?.name} ({zone?.width}x{zone?.height})
            </h3>

            {/* Get Zone Tags button */}
            <div className="mb-6 text-right">

                <Modal>
                    <ModalTrigger>
                        <Button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Get Zone Tags</span>
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <h2 className="text-2xl font-light mb-4">Zone Tags</h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    value={selectedTagType}
                                    onChange={(e) => setSelectedTagType(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border  bg-[#0b0a0b] rounded-md"
                                >
                                    <option value="js">JavaScript</option>
                                    <option value="iframe">IFrame</option>
                                    <option value="json">JSON Ad API</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <textarea
                                    className="w-full border  rounded-md p-2 h-32"
                                    rows={5}
                                    placeholder=""
                                    readOnly
                                    value={`// Generated tag code for ${zone?.name} (${zone?.width}x${zone?.height}) - ${selectedTagType}`}
                                />
                            </div>
                        </ModalContent>
                    </ModalBody>
                </Modal>
            </div>


            {/* Assigned Campaigns Section */}
            <div className="flex justify-between">
                <h4 className="text-lg font-medium mb-4">Assigned Campaigns</h4>

                <Modal>
                    <ModalTrigger>
                        <Button>
                            Assign New
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <h4 className="text-lg font-medium mb-4">Select a campaign to assign to "{zone?.name}"</h4>

                            <div className="mb-4 overflow-x-auto">
                                <Table >
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead scope="col" ></TableHead>
                                            <TableHead scope="col" >Campaign</TableHead>
                                            <TableHead scope="col" >Eligible Ad Items</TableHead>
                                            <TableHead scope="col" >Advertiser</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4} >No Campaigns Found</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </ModalContent>
                    </ModalBody>
                </Modal>
            </div>

            {/* Assigned Campaigns Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead scope="col" ></TableHead>
                        <TableHead scope="col" >Name</TableHead>
                        <TableHead scope="col" >Total Impressions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {assignedCampaigns.length > 0 ? (
                        assignedCampaigns.map((campaign) => (
                            <TableRow key={`${campaign.id}-${campaign.name}`}  >
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={selectedCampaigns.includes(campaign.id)}
                                        onChange={() => toggleCampaignSelection(campaign.id)}
                                    />
                                </TableCell>
                                <TableCell className='hover:text-blue-500'>
                                    <Link to={`/admin/advertiser/campaign/view?campaign_id=${campaign.id}`}>
                                    {campaign.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{campaign.total_impressions}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} >This zone has no assigned campaigns</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Remove Campaign Button */}
            <div>
                <Button
                    onClick={handleRemoveCampaigns}
                    disabled={selectedCampaigns.length === 0}
                    variant="destructive"
                >
                    Remove
                </Button>
            </div>
        </div>
    );
}