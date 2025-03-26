const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function exportData() {
    try {
        const characters = await prisma.character.findMany({
            include: {
                characterStats: true, // Include character stats
                characterSkills: {
                    include: {
                        skill: true, // Include skill details
                    }
                }
            }
        });

        // Convert to JSON
        const jsonData = JSON.stringify(characters, null, 2);
        
        // Save to file
        fs.writeFileSync('characters_export.json', jsonData);

        console.log('✅ Data exported successfully to characters_export.json!');
    } catch (error) {
        console.error('❌ Error exporting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

exportData();
