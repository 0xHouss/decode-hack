import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Submission } from '@prisma/client';
import { writeFileSync } from 'fs';

async function main() {
  try {
    const data = await prisma.submission.findMany({
      orderBy: {
        submittedAt: 'asc',
      },
    });

    if (!data.length)
      return console.log('No data found.');

    const headers: (keyof Submission)[] = [
      "submittedAt",
      "firstName",
      "lastName",
      "email",
      "phone",
      "birthDate",
      "discord",
      "institution",
      "enrollmentYear",
      "major",
      "matricule",
      "teamName",
      "availability",
      "prevExperience",
      "prevExperienceDetails",
      "motivation",
      "skills",
      "github",
      "linkedin",
      "portfolio",
      "behance"
    ]

    // CSV escapes quotes by doubling them; quoted fields can also hold commas and newlines
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const rows = data.map(row => headers.map(h => {
      if (h === 'submittedAt') return escape(formatDate(row[h]));
      return escape(row[h] ?? '')
    }).join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    writeFileSync('export.csv', csv);
    console.log('✅ Exported to export.csv');
  } catch (error) {
    console.error('❌ Failed to export:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Error executing export script:', error);
  process.exit(1);
})
