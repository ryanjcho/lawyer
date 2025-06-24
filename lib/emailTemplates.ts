export const emailTemplates = {
  // Welcome email after contract upload
  welcome: {
    subject: "계약서 분석이 시작되었습니다 - LawScan",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">안녕하세요!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">계약서 분석이 성공적으로 시작되었습니다.</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <h2 style="color: #333; margin-bottom: 20px;">다음 단계</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #667eea; margin-top: 0;">📋 분석 진행 상황</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>AI 기반 초기 분석 완료</li>
              <li>전문 변호사 검토 진행 중</li>
              <li>24시간 내 상세 보고서 제공</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboardUrl}}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              대시보드 확인하기
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              궁금한 점이 있으시면 언제든 문의해주세요.<br>
              📧 support@lawscan.kr | 📞 02-1234-5678
            </p>
          </div>
        </div>
      </div>
    `
  },

  // Preview results email
  previewResults: {
    subject: "계약서 분석 미리보기 - 중요한 발견사항이 있습니다",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">⚠️ 주의가 필요한 발견사항</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">계약서에서 중요한 위험 요소를 발견했습니다.</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #856404; margin-top: 0;">🔍 주요 발견사항</h3>
            <ul style="color: #856404; line-height: 1.6;">
              <li><strong>위험도 점수:</strong> {{riskScore}}/10</li>
              <li><strong>발견된 문제점:</strong> {{issueCount}}개</li>
              <li><strong>예상 절약 금액:</strong> ₩{{potentialSavings}}</li>
            </ul>
          </div>
          
          <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #155724; margin-top: 0;">💡 완전한 분석을 받아보세요</h3>
            <p style="color: #155724; margin-bottom: 0;">
              전문 변호사의 상세한 분석과 구체적인 해결방안을 확인하실 수 있습니다.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{paymentUrl}}" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              완전한 분석 받기 - ₩299,000
            </a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px;">
            <h4 style="color: #333; margin-top: 0;">🎁 첫 구매 혜택</h4>
            <ul style="color: #666; line-height: 1.6; margin: 0;">
              <li>100% 만족 보장</li>
              <li>15분 무료 상담</li>
              <li>30일 내 재검토</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  // Urgency email
  urgency: {
    subject: "⏰ 24시간 남음 - 계약서 분석 할인 마감",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ff7675 0%, #d63031 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">⏰ 시간이 얼마 남지 않았습니다</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">첫 구매 할인이 곧 만료됩니다.</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 48px; font-weight: bold; color: #d63031; margin-bottom: 10px;">
              {{timeRemaining}}
            </div>
            <p style="color: #666; margin: 0;">남은 시간</p>
          </div>
          
          <div style="background: #fff5f5; border: 1px solid #fed7d7; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #c53030; margin-top: 0;">🔥 지금 결제하시면</h3>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #d63031;">₩299,000</div>
                <div style="color: #666; text-decoration: line-through;">₩499,000</div>
              </div>
              <div style="background: #d63031; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold;">
                40% 할인
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{paymentUrl}}" style="background: #d63031; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px;">
              지금 결제하기
            </a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h4 style="color: #333; margin-top: 0;">💡 왜 지금 결제해야 할까요?</h4>
            <ul style="color: #666; line-height: 1.6; margin: 0;">
              <li>할인가로 전문가 검토 받기</li>
              <li>계약 위험을 미리 방지</li>
              <li>법적 분쟁 예방</li>
              <li>평소보다 40% 저렴한 가격</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  // Social proof email
  socialProof: {
    subject: "다른 고객들은 어떻게 생각하시나요? - LawScan 후기",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">고객 후기</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">실제 고객들의 생생한 경험담을 들어보세요.</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="width: 50px; height: 50px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">
                김
              </div>
              <div>
                <div style="font-weight: bold; color: #333;">김지훈, 스타트업 CEO</div>
                <div style="color: #666; font-size: 14px;">⭐⭐⭐⭐⭐ 5.0</div>
              </div>
            </div>
            <p style="color: #666; line-height: 1.6; margin: 0; font-style: italic;">
              "계약서 검토부터 분쟁까지, 온라인으로 이렇게 신속하고 믿을 수 있는 서비스는 처음이었습니다. 
              실제로 중요한 문제점을 발견해서 큰 위험을 피할 수 있었어요."
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="width: 50px; height: 50px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">
                이
              </div>
              <div>
                <div style="font-weight: bold; color: #333;">이수진, 법무팀장</div>
                <div style="color: #666; font-size: 14px;">⭐⭐⭐⭐⭐ 5.0</div>
              </div>
            </div>
            <p style="color: #666; line-height: 1.6; margin: 0; font-style: italic;">
              "복잡한 문제일수록 맞춤형 전략이 필요합니다. LawScan이 제공한 분석으로 
              큰 위험을 피할 수 있었고, 구체적인 해결방안까지 제시해주셨어요."
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{paymentUrl}}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              나도 후기 남기기
            </a>
          </div>
          
          <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 20px; border-radius: 8px;">
            <h4 style="color: #155724; margin-top: 0;">📊 고객 만족도</h4>
            <div style="display: flex; justify-content: space-around; text-align: center;">
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #155724;">98%</div>
                <div style="color: #666; font-size: 14px;">만족도</div>
              </div>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #155724;">1,247</div>
                <div style="color: #666; font-size: 14px;">검토 완료</div>
              </div>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #155724;">24h</div>
                <div style="color: #666; font-size: 14px;">평균 완료</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // Final reminder
  finalReminder: {
    subject: "마지막 기회 - 계약서 분석 할인 오늘 마감",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2d3436 0%, #636e72 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">마지막 기회입니다</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">할인이 오늘 자정에 만료됩니다.</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 36px; font-weight: bold; color: #2d3436; margin-bottom: 10px;">
              {{hoursRemaining}}시간 {{minutesRemaining}}분
            </div>
            <p style="color: #666; margin: 0;">남은 시간</p>
          </div>
          
          <div style="background: #fff5f5; border: 2px solid #fed7d7; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #c53030; margin-top: 0; text-align: center;">🔥 절대 놓치면 안 되는 이유</h3>
            <ul style="color: #666; line-height: 1.8; margin: 0;">
              <li>평소보다 <strong>40% 저렴한 가격</strong></li>
              <li>전문 변호사 <strong>직접 검토</strong></li>
              <li><strong>100% 만족 보장</strong></li>
              <li>계약 위험을 <strong>미리 방지</strong></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{paymentUrl}}" style="background: #2d3436; color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px;">
              지금 바로 결제하기
            </a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              이 할인은 오늘 자정에 만료되며, 재발행되지 않습니다.<br>
              계약서 분석이 필요하시다면 지금이 마지막 기회입니다.
            </p>
          </div>
        </div>
      </div>
    `
  }
};

export const emailSequences = {
  // Email sequence for users who uploaded contract but didn't pay
  contractUploadSequence: [
    {
      delay: 0, // Immediate
      template: 'welcome'
    },
    {
      delay: 2 * 60 * 60 * 1000, // 2 hours
      template: 'previewResults'
    },
    {
      delay: 24 * 60 * 60 * 1000, // 24 hours
      template: 'urgency'
    },
    {
      delay: 48 * 60 * 60 * 1000, // 48 hours
      template: 'socialProof'
    },
    {
      delay: 72 * 60 * 60 * 1000, // 72 hours
      template: 'finalReminder'
    }
  ]
}; 