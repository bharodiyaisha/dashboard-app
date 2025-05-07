import { Button } from '@/components/ui/button';

export default function Sidebar({ onSelectType }) {
  const menuItems = [
    { name: 'All Content', type: 'all' },
    { name: 'Videos', type: 'video' },
    { name: 'Audio', type: 'audio' },
    { name: 'Articles', type: 'article' },
    { name: 'Photos', type: 'photos' },
    { name: 'Quotes', type: 'quotes' },
  ];

  return (
    <div className="w-64 border-r p-4">
      <h2 className="text-lg font-bold mb-4">Content</h2>
      <nav className="space-y-2">
        {menuItems.map(item => (
          <Button
            key={item.type}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onSelectType(item.type)}
          >
            {item.name}
          </Button>
        ))}
      </nav>
    </div>
  );
}