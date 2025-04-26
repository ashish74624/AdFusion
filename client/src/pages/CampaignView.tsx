import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

interface AdItem {
    id: number;
    name: string;
    total_impressions: number;
    clicks: number;
}

interface Zone {
    id: number;
    name: string;
    total_impressions: number;
    publisher?: string;
    dimensions?: string;
}



const CampaignManager = () => {

    const [campaignName, setCampaignName] = useState("");
    const [adItems, setAdItems] = useState<AdItem[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);

    const [searchParams] = useSearchParams();

    const campaignId = searchParams.get("campaign_id");

    const fetchData = async () => {
        try {
            const res = await fetch(`${base_url}/campaign/view?campaign_id=${campaignId}`);
            if (res.ok) {
                const data = await res.json();
                setCampaignName(data.campaign.name);
                setAdItems(data.ad_items);
                setZones(data.zones);
            }
        } catch {
            toast.error("Unable to fetch data");
        }
    }

    useEffect(() => {
        fetchData();
    }, [campaignId, searchParams])

    return (
        <div className="p-4">
            {/* Campaign Name */}
            <h3 className="text-2xl font-light">{campaignName}</h3>

            {/* Ad Items */}
            <div className="flex justify-between">

                <h4 className="text-xl font-light mt-8">Ad Items</h4>
                <Modal>
                    <ModalTrigger>
                        <Button>
                            Add New
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent className="h-max">
                            <h2 className="text-2xl mb-4">New Ad Item</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Name</label>
                                    <input className="w-full border px-3 py-2 rounded" type="text" placeholder="Ad name" />
                                </div>

                                <div>
                                    <label className="block mb-1">Destination URL</label>
                                    <input className="w-full border px-3 py-2 rounded" type="text" placeholder="http://" />
                                </div>

                                <div>
                                    <label className="block mb-1">Image source</label>
                                    <input className="w-full border px-3 py-2 rounded" type="text" placeholder="http://" />
                                </div>

                                <div>
                                    <label className="block mb-1">Size</label>
                                    <select className="w-full border px-3 py-2 rounded bg-[#0b0a0b]">
                                        <option disabled>IAB Core Ad Units:</option>
                                        <option value="300x250">300x250 - Medium Rectangle</option>
                                        <option value="180x150">180x150 - Rectangle</option>
                                        <option value="728x90">728x90 - Leaderboard</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1">Target Window</label>
                                    <div className="flex space-x-4">
                                        <label>
                                            <input className="mr-1" type="radio" name="target" value="_blank" defaultChecked />
                                            New
                                        </label>
                                        <label>
                                            <input className="mr-1" type="radio" name="target" value="" />
                                            Same
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <Button>
                                Save Ad Item
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </div>

            {/* Ad Item Table */}
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead  >Select</TableHead>
                        <TableHead  >Name</TableHead>
                        <TableHead  >Total Impressions</TableHead>
                        <TableHead  >Clicks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adItems.length > 0 ? (
                        adItems.map((adItem) => (
                            <TableRow key={adItem.id}>
                                <TableCell >
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell>{adItem.name}</TableCell>
                                <TableCell>{adItem.total_impressions}</TableCell>
                                <TableCell>{adItem.clicks}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>
                                This campaign has no ad items
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="my-4">
                <Button variant="destructive">
                    Delete
                </Button>
            </div>

            {/* Zone Assignments */}
            <div className="flex justify-between">
                <h4 className="text-xl font-light mt-12">Zone Assignments</h4>
                
                <Modal>
                    <ModalTrigger>
                        <Button>
                            Assign to Zone
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent className="h-max">
                            <h4 className="text-xl mb-2">Select a Zone</h4>
                            <h6 className="text-sm mb-4 text-gray-600">
                                Eligible Zones for {campaignName}
                            </h6>

                            <Table className="border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead  >Select</TableHead>
                                        <TableHead  >Name</TableHead>
                                        <TableHead  >Publisher</TableHead>
                                        <TableHead  >Zone Dimensions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {zones.length > 0 ? (
                                        zones.map((zone) => (
                                            <TableRow key={zone.id} className="cursor-pointer">
                                                <TableCell className="p-2 border text-center">
                                                    <input type="checkbox" />
                                                </TableCell>
                                                <TableCell>{zone.name}</TableCell>
                                                <TableCell>{zone.publisher}</TableCell>
                                                <TableCell>{zone.dimensions}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell className="p-4 border text-center" colSpan={4}>
                                                No Zones Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            {/* <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 border rounded"
                                    onClick={() => setShowZoneModal(false)}
                                >
                                    Cancel
                                </button>
                            </div> */}
                        </ModalContent>
                        {/* <ModalFooter className="gap-4">
                            <Button>
                                Save Ad Item
                            </Button>
                        </ModalFooter> */}
                    </ModalBody>
                </Modal>
            </div>
           

            {/* Zone Assignment Table */}
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead  >Select</TableHead>
                        <TableHead  >Name</TableHead>
                        <TableHead  >Total Impressions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {zones.length > 0 ? (
                        zones.map((zone) => (
                            <TableRow key={zone.id}>
                                <TableCell className="p-2 border text-center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell>{zone.name}</TableCell>
                                <TableCell>{zone.total_impressions}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="p-4 border text-center" colSpan={3}>
                                This campaign has no zone assignments
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="my-4">
                <Button variant="destructive">
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default CampaignManager;
