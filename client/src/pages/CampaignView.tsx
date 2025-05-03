import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";
import { ChangeEvent, useEffect, useState } from "react";
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
    const [adItemName,setAdItemName] = useState("");
    const [adItemDestUrl, setAdItemDestUrl] = useState("");
    const [adItemImgSrc,setAdItemImgSrc] = useState("");
    const [selectedSize, setSelectedSize] = useState("300x250");
    const [target, setTarget] = useState("_blank"); 
    const [adIds,setAdIds] = useState<number[]>([]);
    const [zoneIds,setZoneIds] = useState<number[]>([]);
    const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTarget(e.target.value);
    };
    
    const [searchParams] = useSearchParams();

    const campaignId = searchParams.get("campaign_id");

    // Update the useEffect dependency array
    useEffect(() => {
        if (campaignId) {
            fetchData();
        }
    }, [campaignId]); // Include campaignId as a dependency

    // Improve the fetchData function
    const fetchData = async () => {
        try {
            const res = await fetch(`${base_url}/campaign/view?campaign_id=${campaignId}`);
            if (!res.ok) {
                throw new Error('API response was not ok');
            }

            const data = await res.json();
            console.log("API response:", data);

            // Check if data has the expected structure
            if (data && data.campaign) {
                setCampaignName(data.campaign.name);
                setAdItems(data.ad_items || []);
                setZones(data.zones || []);
            } else {
                toast.error("Invalid response format");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Unable to fetch data");
        }
    };

    async function createAdItem() {
        try {
            const res = await fetch(`${base_url}/aditem/create`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    campaign_id: campaignId,
                    name:adItemName,
                    link: adItemDestUrl,
                    image_url: adItemImgSrc,
                    size: selectedSize,
                    html_target: target
                })
            })

            if(res.ok){
                toast.success("Ad item added");
                fetchData();
            }
        } catch {
            toast.error("Failed to add ad item");
        }
    }

    const toggleAdSelection=(aid:number)=>{
        if (adIds.includes(aid)) {
            setAdIds(adIds.filter(id => id !== aid));
        } else {
            setAdIds([...adIds, aid]);
        }
    }


    const toggleZoneSelection=(zid:number)=>{
        if (zoneIds.includes(zid)) {
            setZoneIds(zoneIds.filter(id => id !== zid));
        } else {
            setZoneIds([...zoneIds, zid]);
        }
    }

    async function deleteItems(isAd:boolean) {
        try {
            const url = isAd ? `${base_url}/aditem/delete` : `${base_url}/zone/delete`
            const res = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ids: isAd ? adIds: zoneIds
                })
            });

            if(res.ok){
                toast.success("Deletion Success");
                fetchData();
                if(isAd){
                    setAdIds([]);
                }else{
                    setZoneIds([]);
                }
            }else{
                throw new Error("");
            }
        } catch {
            toast.error("Deletion failed");

        }
    }

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
                                    <input className="w-full border px-3 py-2 rounded" type="text" placeholder="Ad name"
                                    value={adItemName}
                                    onChange={(e)=>setAdItemName(e.target.value)} />
                                </div>

                                <div>
                                    <label className="block mb-1">Destination URL</label>
                                    <input className="w-full border px-3 py-2 rounded" 
                                    value={adItemDestUrl}
                                    onChange={(e)=>{setAdItemDestUrl(e.target.value)}}
                                    type="text" placeholder="http://" />
                                </div>

                                <div>
                                    <label className="block mb-1">Image source</label>
                                    <input className="w-full border px-3 py-2 rounded"
                                    value={adItemImgSrc} 
                                    onChange={(e)=>setAdItemImgSrc(e.target.value)}
                                    type="text" placeholder="http://" />
                                </div>

                                <div>
                                    <label className="block mb-1">Size</label>
                                    <select className="w-full border px-3 py-2 rounded bg-[#0b0a0b]"
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
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
                                            <input
                                                className="mr-1"
                                                type="radio"
                                                name="target"
                                                value="_blank"
                                                checked={target === "_blank"}
                                                onChange={handleTargetChange}
                                            />
                                            New
                                        </label>
                                        <label>
                                            <input
                                                className="mr-1"
                                                type="radio"
                                                name="target"
                                                value=""
                                                checked={target === ""}
                                                onChange={handleTargetChange}
                                            />
                                            Same
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <Button onClick={createAdItem}>
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
                        <TableHead>Select</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Total Impressions</TableHead>
                        <TableHead>Clicks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adItems.length > 0 ? (
                        adItems.map((adItem) => (
                            <TableRow key={adItem.id}>
                                <TableCell >
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={adIds.includes(adItem.id)}
                                        onChange={() => toggleAdSelection(adItem.id)}
                                    />
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
                <Button variant="destructive" disabled={adIds.length===0} onClick={()=>deleteItems(true)}>
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
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        
                                                    />
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

                        </ModalContent>
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
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={zoneIds.includes(zone.id)}
                                        onChange={() => toggleZoneSelection(zone.id)}
                                    />
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
                <Button variant="destructive" disabled={zoneIds.length === 0} onClick={() => deleteItems(false)} >
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default CampaignManager;
