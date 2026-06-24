import { StyleSheet } from "react-native";
export const COLORS = {
    navy: "#062B5C",
    navyLight: "#0B4A8B",
    primary: "#0066FF",
    accent: "#00B4FF",
    white: "#FFFFFF",
    background: "#F5F7FB",
    card: "#FFFFFF",
    text: "#132238",
    textSecondary: "#526071",
    textMuted: "#8B98A8",
    border: "#E5EAF0",
    success: "#16A34A",
    danger: "#DC2626",
};

export const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: COLORS.background,
    },

    /*
    =========================
        HEADER MARKETPLACE
    =========================
    */
    marketplaceHeader:{
        backgroundColor: COLORS.navy,
        paddingTop:45,
        paddingHorizontal:20,
        paddingBottom:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    marketplaceLabel:{
        color:"#B8D8FF",
        fontSize:12,
        fontWeight:"700",
        letterSpacing:1,
        marginBottom:15,
    },
    marketplaceTitle:{
        color:COLORS.white,
        fontSize:34,
        fontWeight:"800",
        lineHeight:38,
    },
    marketplaceAccent:{
        color:COLORS.accent,
    },
    marketplaceSubtitle:{
        color:"#D7E6F8",
        fontSize:14,
        lineHeight:21,
        marginTop:12,
        maxWidth:320,
    },

    /*
    =========================
        STATISTICS CARDS
    =========================
    */
    heroStats:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:25,
        gap:8,
    },
    statCard:{
        flex:1,
        backgroundColor:"#FFFFFF",
        borderRadius:18,
        padding:12,
        minHeight:95,
        elevation:4,
        shadowColor:"#000",
        shadowOpacity:0.12,
        shadowRadius:8,
        shadowOffset:{
            width:0,
            height:3
        },
    },
    statLabel:{
        fontSize:10,
        fontWeight:"700",
        color:COLORS.textSecondary,
    },
    statNumber:{
        fontSize:28,
        fontWeight:"800",
        color:COLORS.navy,
        marginTop:6,
    },
    statFooter:{
        fontSize:10,
        color:COLORS.textMuted,
    },

    /*
    =========================
        CONTENT
    =========================
    */
    content:{
        flex:1,
        paddingHorizontal:18,
        marginTop:15,
    },

    /*
    =========================
        FILTER TABS
    =========================
    */
    filterContainer:{
        backgroundColor:"#E9EEF6",
        borderRadius:18,
        padding:5,
        flexDirection:"row",
        marginBottom:15,
    },
    filterTab:{
        flex:1,
        paddingVertical:12,
        alignItems:"center",
        borderRadius:14,
    },
    filterTabActive:{
        backgroundColor:COLORS.white,
        elevation:3,
    },
    filterText:{
        fontSize:12,
        fontWeight:"700",
        color:COLORS.textMuted,
    },
    filterTextActive:{
        color:COLORS.navy,
    },

    /*
    =========================
        SEARCH
    =========================
    */
    searchContainer:{
        backgroundColor:COLORS.white,
        borderRadius:18,
        height:52,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:15,
        marginBottom:18,
        borderWidth:1,
        borderColor:COLORS.border,
    },
    searchInput:{
        flex:1,
        marginLeft:10,
        color:COLORS.text,
        fontSize:14,
    },
    sectionLabel:{
        fontSize:18,
        fontWeight:"800",
        color:COLORS.text,
        marginBottom:12,
    },

    /*
    =========================
        PRODUCT CARDS
    =========================
    */
    productCard:{
        backgroundColor:COLORS.white,
        borderRadius:22,
        padding:18,
        marginBottom:15,
        elevation:3,
        shadowColor:"#000",
        shadowOpacity:0.08,
        shadowRadius:8,
        shadowOffset:{
            width:0,
            height:4
        },
    },
    productTitle:{
        fontSize:17,
        fontWeight:"800",
        color:COLORS.text,
    },
    productDescription:{
        fontSize:13,
        color:COLORS.textSecondary,
        marginTop:6,
        lineHeight:18,
    },
    productPrice:{
        marginTop:12,
        fontSize:18,
        fontWeight:"800",
        color:COLORS.primary,
    },

    /*
    =========================
        EMPTY STATE
    =========================
    */
    emptyState:{
        backgroundColor:COLORS.white,
        borderRadius:24,
        padding:35,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
    },
    emptyTitle:{
        fontSize:18,
        fontWeight:"800",
        color:COLORS.text,
        marginTop:15,
    },
    emptySubtitle:{
        textAlign:"center",
        color:COLORS.textMuted,
        marginTop:8,
        lineHeight:20,
    },
    retryText:{
        marginTop:15,
        color:COLORS.primary,
        fontWeight:"700",
    },

    /*
    =========================
        LOADING
    =========================
    */
    loadingContainer:{
        alignItems:"center",
        marginTop:50,
    },
    loadingText:{
        marginTop:12,
        color:COLORS.textSecondary,
    },

    /*
    =========================
        SUCCESS STRIP
    =========================
    */
    successStrip:{
        backgroundColor:"#DCFCE7",
        borderRadius:15,
        padding:12,
        marginBottom:15,
    },
    successText:{
        color:"#166534",
        fontSize:13,
        fontWeight:"600",
    },

    /*
    =========================
        MODAL
    =========================
    */
    modalOverlay:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.45)",
        justifyContent:"flex-end",
    },
    modalContainer:{
        backgroundColor:COLORS.white,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:25,
        minHeight:350,
    },
    modalTitle:{
        fontSize:22,
        fontWeight:"800",
        color:COLORS.text,
    },
});