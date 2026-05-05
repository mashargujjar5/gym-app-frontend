import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Colors, BorderRadius } from '../theme';
import { 
  ArrowLeft, 
  Check, 
  Sparkles,
  Zap,
  ShieldCheck,
  X,
  CreditCard,
  Ticket
} from 'lucide-react-native';

const FeatureItem = ({ text, included = true }: { text: string; included?: boolean }) => (
  <View style={styles.featureItem}>
    {included ? (
      <View style={styles.checkWrap}>
        <Check size={12} color="#10B981" />
      </View>
    ) : (
      <View style={[styles.checkWrap, { backgroundColor: '#F1F5F9' }]}>
        <X size={10} color="#94A3B8" />
      </View>
    )}
    <Text style={[styles.featureText, !included && styles.featureTextDisabled]}>{text}</Text>
  </View>
);

export const AthleteSubscriptionScreen = ({ navigation }: any) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WELCOME20') {
      setPromoApplied(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Subscription</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Current Plan Indicator */}
          <View style={styles.currentPlanBanner}>
            <View>
              <Text style={styles.currentPlanLabel}>Current Plan</Text>
              <Text style={styles.currentPlanName}>Athlete Free</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          {/* Athlete Free Card */}
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <View style={[styles.planIcon, { backgroundColor: '#F1F5F9' }]}>
                <Zap size={24} color="#64748B" />
              </View>
              <View>
                <Text style={styles.planName}>Athlete Free</Text>
                <Text style={styles.planSub}>Basic tracking - Train workouts independently</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.currency}>$</Text>
              <Text style={styles.price}>0</Text>
              <Text style={styles.period}>per month</Text>
            </View>

            <View style={styles.featuresList}>
              <FeatureItem text="Log workouts (exercises, sets, reps, weight)" />
              <FeatureItem text="Basic nutrition tracking" />
              <FeatureItem text="Progress metrics (weight and body stats)" />
              <FeatureItem text="Limited workout history" />
              <FeatureItem text="No personalised coaching features" included={false} />
              <FeatureItem text="Limited analytics" included={false} />
              <FeatureItem text="Limited exercise library" included={false} />
              <FeatureItem text="No PreHab Access" included={false} />
            </View>

            <TouchableOpacity style={styles.currentPlanBtn} disabled>
              <Text style={styles.currentPlanBtnText}>Current Plan</Text>
            </TouchableOpacity>
          </View>

          {/* Athlete Pro Card */}
          <View style={[styles.planCard, styles.proCard]}>
            <View style={styles.planHeader}>
              <View style={[styles.planIcon, { backgroundColor: '#010E1F' }]}>
                <ShieldCheck size={24} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.planName}>Athlete Pro</Text>
                <Text style={styles.planSub}>Full Training Experience - Complete fitness tracking and coaching</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.currency}>$</Text>
              <Text style={styles.price}>9.99</Text>
              <Text style={styles.period}>per month</Text>
            </View>

            <View style={styles.featuresList}>
              <FeatureItem text="Full workout tracking and history" />
              <FeatureItem text="Nutrition tracking with macro breakdown" />
              <FeatureItem text="Progress charts and performance insights" />
              <FeatureItem text="Pre-hab injury risk monitoring" />
              <FeatureItem text="Connect with and communicate with coaches" />
              <FeatureItem text="Access personalised training plans" />
              <FeatureItem text="Access to Pre-hab Dashboard" />
              <FeatureItem text="Access to AI Workout Generator" />
              <FeatureItem text="Advanced performance analytics" />
            </View>

            <TouchableOpacity style={styles.upgradeBtn} onPress={() => setShowCheckout(true)}>
              <Text style={styles.upgradeBtnText}>Upgrade Now</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.finePrint}>
            All plans include a 7-day free trial. Cancel anytime with no penalties.{"\n"}
            Payment processed securely through Stripe.
          </Text>
        </ScrollView>

        {/* Checkout Modal Mockup */}
        <Modal
          visible={showCheckout}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCheckout(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Upgrade to Athlete Pro</Text>
                <TouchableOpacity onPress={() => setShowCheckout(false)}>
                  <X size={24} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.checkoutSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Plan Price</Text>
                  <Text style={styles.summaryValue}>$9.99</Text>
                </View>
                {promoApplied && (
                  <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: '#10B981' }]}>Discount (20%)</Text>
                    <Text style={[styles.summaryValue, { color: '#10B981' }]}>-$2.00</Text>
                  </View>
                )}
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Final Price</Text>
                  <Text style={styles.totalValue}>{promoApplied ? '$7.99' : '$9.99'}</Text>
                </View>
              </View>

              {!promoApplied ? (
                <View style={styles.promoSection}>
                  <View style={styles.promoInputRow}>
                    <Ticket size={20} color="#94A3B8" />
                    <TextInput
                      style={styles.promoInput}
                      placeholder="Enter discount code"
                      placeholderTextColor="#94A3B8"
                      value={promoCode}
                      onChangeText={setPromoCode}
                      autoCapitalize="characters"
                    />
                    <TouchableOpacity onPress={applyPromo}>
                      <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.promoTips}>
                    <Text style={styles.tipsLabel}>Try these codes:</Text>
                    <View style={styles.tipsRow}>
                      <TouchableOpacity onPress={() => setPromoCode('WELCOME20')} style={styles.tipBadge}>
                        <Text style={styles.tipText}>WELCOME20</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setPromoCode('SAVE10')} style={styles.tipBadge}>
                        <Text style={styles.tipText}>SAVE10</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setPromoCode('COACH50')} style={styles.tipBadge}>
                        <Text style={styles.tipText}>COACH50</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.appliedPromoBox}>
                  <View style={styles.appliedHeader}>
                    <View style={styles.appliedLabelRow}>
                      <Zap size={16} color="#10B981" />
                      <Text style={styles.appliedCodeText}>WELCOME20</Text>
                    </View>
                    <TouchableOpacity onPress={() => setPromoApplied(false)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.successText}>Code applied successfully!</Text>
                  <Text style={styles.successSub}>20% off for new users</Text>
                </View>
              )}

              <TouchableOpacity 
                style={styles.proceedBtn}
                onPress={() => {
                  setShowCheckout(false);
                  Alert.alert('Mockup', 'This would proceed to Stripe payment flow.');
                }}
              >
                <Text style={styles.proceedText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  currentPlanBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  currentPlanLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginBottom: 4,
  },
  currentPlanName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#0EA5E9',
    fontSize: 12,
    fontWeight: '800',
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  proCard: {
    borderColor: '#0F172A20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  planIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  planSub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    paddingRight: 40,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 32,
  },
  currency: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 4,
  },
  price: {
    fontSize: 44,
    fontWeight: '900',
    color: '#0F172A',
  },
  period: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    marginLeft: 8,
  },
  featuresList: {
    gap: 16,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  featureTextDisabled: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  currentPlanBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  currentPlanBtnText: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '800',
  },
  upgradeBtn: {
    backgroundColor: '#010E1F',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#010E1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  upgradeBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  finePrint: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 18,
    marginTop: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  checkoutSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  promoSection: {
    marginBottom: 24,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  promoInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  applyText: {
    color: '#0EA5E9',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 12,
  },
  promoTips: {
    marginTop: 16,
  },
  tipsLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 4,
  },
  tipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tipBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tipText: {
    color: '#0EA5E9',
    fontSize: 11,
    fontWeight: '700',
  },
  appliedPromoBox: {
    backgroundColor: '#ECFEFF',
    borderWidth: 1,
    borderColor: '#22D3EE',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  appliedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appliedLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appliedCodeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0891B2',
  },
  removeText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '700',
  },
  successText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  successSub: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  proceedBtn: {
    backgroundColor: '#010E1F',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
