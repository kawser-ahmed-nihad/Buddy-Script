import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTags = async () => {
    const res = await axios.get('/api/tags');
    return res.data;
};

const AllTags = ({ selectedTag, setSelectedTag }) => {
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });

    if (!Array.isArray(tags)) {
        return <p className="text-center text-red-500">Invalid tags data.</p>;
    }
    if (isLoading) return <p>Loading tags...</p>;

    return (
        <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag((prev) => (prev === tag ? null : tag))}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition
            ${selectedTag === tag
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
};

export default AllTags;
