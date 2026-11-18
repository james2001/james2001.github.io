import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: '3px solid #2c3e50',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    backgroundColor: '#2c3e50',
    padding: '6 10',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 8,
    textAlign: 'justify',
    color: '#34495e',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCategory: {
    width: '31.5%',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    borderLeft: '3px solid #3498db',
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2c3e50',
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    flex: 1,
    color: '#34495e',
  },
  skillLevel: {
    fontSize: 8,
    color: '#3498db',
    marginLeft: 5,
  },
  experienceItem: {
    marginBottom: 15,
    paddingBottom: 12,
    borderBottom: '1px solid #e0e0e0',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },
  experienceRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  experienceDate: {
    fontSize: 9,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  experienceCompany: {
    fontSize: 10,
    color: '#3498db',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  experienceLocation: {
    fontSize: 9,
    color: '#95a5a6',
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: 'justify',
    color: '#34495e',
  },
  certificationItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificationName: {
    fontSize: 10,
    flex: 1,
    color: '#34495e',
  },
  certificationYear: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: '#3498db',
    padding: '3 8',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  experienceSector: {
    fontSize: 9,
    color: '#5b7cb3',
    marginBottom: 2,
  },
  experienceStack: {
    fontSize: 8.5,
    color: '#2c3e50',
    marginTop: 4,
  },
  experienceStackLabel: {
    fontWeight: 'bold',
  },
  formationItem: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formationName: {
    fontSize: 10,
    color: '#34495e',
    flex: 1,
  },
  formationYears: {
    fontSize: 9,
    color: '#7f8c8d',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
  },
});

// Fonction pour formater les dates (endDate peut valoir "present" pour une mission en cours)
const formatDate = (startDate, endDate, lang) => {
  const months = {
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  const monthNames = months[lang] || months.en;
  const format = (date) => {
    const [year, month] = date.split('-');
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };
  const end = endDate === 'present' ? (lang === 'fr' ? "aujourd'hui" : 'present') : format(endDate);

  return `${format(startDate)} - ${end}`;
};

const localized = (field, lang) => (field && typeof field === 'object' ? field[lang] ?? field.en : field);

// Fonction pour afficher les niveaux de compétence
const getSkillLevel = (value) => {
  return `${value}/4`;
};

const CVDocument = ({ userData, skillsData, experiencesData, certificationsData, formationsData = [], summary, lang, anonymous }) => {
  const headline = localized(userData.headline, lang);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        {!anonymous && (
          <View style={styles.header}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.title}>{headline}</Text>
          </View>
        )}

        {anonymous && (
          <View style={styles.header}>
            <Text style={styles.title}>{headline}</Text>
          </View>
        )}

        {/* À propos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {lang === 'fr' ? 'Profil' : 'Profile'}
          </Text>
          <Text style={styles.text}>{summary}
          </Text>
        </View>

        {/* Compétences en grid 2 colonnes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {lang === 'fr' ? 'Compétences' : 'Skills'}
          </Text>
          <View style={styles.skillsGrid}>
            {skillsData.map((skillCategory, index) => (
              <View key={index} style={styles.skillCategory} wrap={false}>
                <Text style={styles.skillCategoryTitle}>
                  {typeof skillCategory.category === 'object'
                    ? skillCategory.category[lang]
                    : skillCategory.category}
                </Text>
                {skillCategory.detail.map((skill, idx) => (
                  <View key={idx} style={styles.skillItem}>
                    <Text style={styles.skillName}>
                      • {typeof skill.title === 'object' ? skill.title[lang] : skill.title}
                    </Text>
                    <Text style={styles.skillLevel}>{getSkillLevel(skill.value)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* Page 2 - Expériences */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {lang === 'fr' ? 'Expériences' : 'Experiences'}
          </Text>
          {experiencesData.map((exp, index) => (
            <View key={index} style={styles.experienceItem} wrap={false}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceRole}>
                  {typeof exp.role === 'object' ? exp.role[lang] : exp.role}
                </Text>
                <Text style={styles.experienceDate}>
                  {formatDate(exp.startDate, exp.endDate, lang)}
                </Text>
              </View>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              {exp.sector && <Text style={styles.experienceSector}>{localized(exp.sector, lang)}</Text>}
              <Text style={styles.experienceLocation}>{exp.location}</Text>
              <Text style={styles.experienceDescription}>
                {localized(exp.explanation, lang)}
              </Text>
              {exp.stack?.length > 0 && (
                <Text style={styles.experienceStack}>
                  <Text style={styles.experienceStackLabel}>{lang === 'fr' ? 'Stack : ' : 'Stack: '}</Text>
                  {exp.stack.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      </Page>

      {/* Page 3 - Formation et certifications */}
      <Page size="A4" style={styles.page}>
        {formationsData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {lang === 'fr' ? 'Formation' : 'Education'}
            </Text>
            {formationsData.map((formation, index) => (
              <View key={index} style={styles.formationItem}>
                <Text style={styles.formationName}>• {formation.what} — {formation.where}</Text>
                <Text style={styles.formationYears}>{formation.when}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {lang === 'fr' ? 'Certifications' : 'Certifications'}
          </Text>
          {certificationsData.map((cert, index) => (
            <View key={index} style={styles.certificationItem}>
              <Text style={styles.certificationName}>
                • {typeof cert.name === 'object' ? cert.name[lang] : cert.name}
              </Text>
              <Text style={styles.certificationYear}>{cert.year}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
